import { useEffect, useState } from "react";
import type { TicketType } from "../types/ticket";
import { getCommentsByTicketId, getTicketById } from "../api/ticket.api";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import AddComment from "../components/AddComment";
import useIsAllowed from "../hooks/useIsAllowed";
import type { CommentType } from "../types/comment";


const ViewTicket = (): React.JSX.Element => {
    const { id } = useParams();
    const [ticket, setTicket] = useState<TicketType | null>(null);
    const [comments, setComments] = useState<CommentType[]>([]);
    const isAllowed = useIsAllowed();

    const fetchTicket = async (id: string | undefined): Promise<TicketType> => {
        const data = await getTicketById(id);
        return data.data;
    };

    const fetchComment = async (id: string | undefined): Promise<CommentType[]> => {
        const data = await getCommentsByTicketId(id);
        return data.data;
    };

    useEffect(() => {
        const fetchData = async () => {
            const [ticketData, commentsData] = await Promise.all([
                fetchTicket(id),
                fetchComment(id),
            ]);
            setTicket(ticketData);
            setComments(commentsData);
        };
        fetchData();
    }, [id]);

    return (
        <div className="w-full flex justify-center px-4 py-10 md:p-20">
            <div className="w-full border border-neutral-200 p-6 rounded-2xl space-y-2">
                <h2><span className="font-semibold">Title: </span>{ticket?.title}</h2>
                <h2><span className="font-semibold">Description: </span>{ticket?.description}</h2>
                <h2><span className="font-semibold">Status: </span>{ticket?.status}</h2>
                <h2>
                    {isAllowed("VIEW_OWN_TICKETS") &&
                        <><span className="font-semibold">Support Agent: </span>{ticket?.agentName}</>
                    }
                    {isAllowed("VIEW_ASSIGNED_TICKETS") &&
                        <><span className="font-semibold">Priority: </span>{ticket?.priority}</>
                    }
                </h2>
                <h2>
                    <span className="font-semibold">Created On: </span>
                    {ticket?.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "-"}
                </h2>
                <Comments comments={comments} />
                <AddComment id={id} />
            </div>
        </div>
    );
};

export default ViewTicket;