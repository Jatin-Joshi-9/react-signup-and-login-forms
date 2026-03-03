export type TicketType = {
    id?: string;
    title: string;
    description: string;
    status?: string;
    priority?: string;
    agentName?: string;
    createdAt?: Date;
}

export type UpdateTicketType = {
    description?: string;
    status?: string;
    priority?: string;
}

export type AssignTicketType = {
    assignedToUserId: string;
}