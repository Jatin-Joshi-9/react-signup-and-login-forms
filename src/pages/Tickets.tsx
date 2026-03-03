import { useEffect, useState } from "react";
import { getAllTickets } from "../api/ticket.api";
import type { TicketType } from "../types/ticket";
import useIsAllowed from "../hooks/useIsAllowed";
import TicketActions from "../components/TicketActions";
import Table from "../components/Table";

const Tickets = (): React.JSX.Element => {
    const [tickets, setTickets] = useState<object[]>();
    const isAllowed = useIsAllowed();

    useEffect(() => {
        const fetchTickets = async () => {
            const data = await getAllTickets();
            setTickets(data.data);
        };

        fetchTickets();
    }, []);

    const columns = [
        {
            header: "Title",
            render: (item: object) => {
                const ticket = item as TicketType;
                return <span className="font-medium whitespace-nowrap">{ticket.title}</span>;
            },
        },
        {
            header: "Description",
            render: (item: object) => {
                const ticket = item as TicketType;
                return <p className="truncate text-nowrap max-w-md">{ticket.description}</p>;
            },
        },
        {
            header: "Status",
            render: (item: object) => {
                const ticket = item as TicketType;
                return ticket.status;
            },
        },
        {
            header: isAllowed("VIEW_OWN_TICKETS") ? "Support Agent" : isAllowed("VIEW_ASSIGNED_TICKETS") ? "Priority" : "",
            render: (item: object) => {
                const ticket = item as TicketType;
                return (
                    <>
                        {isAllowed("VIEW_OWN_TICKETS") && ticket.agentName}
                        {isAllowed("VIEW_ASSIGNED_TICKETS") && ticket.priority}
                    </>
                );
            },
        },
        {
            header: "Created At",
            render: (item: object) => {
                const ticket = item as TicketType;
                return ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "-";
            },
        },
        {
            header: "Actions",
            render: (item: object) => {
                const ticket = item as TicketType;
                return (
                    <div className="space-x-1">
                        <TicketActions ticketId={ticket.id} status={ticket.status} />
                    </div>
                );
            },
        },
    ];

    return (
        <div className="w-full flex flex-col items-center justify-center gap-4 p-4 md:p-20">
            <h1 className="text-xl sm:text-2xl font-extrabold">Tickets</h1>
            <Table
                columns={columns}
                data={tickets}
            />
        </div>
    );
};

export default Tickets;