import type { TicketType } from "../types/ticket";

export const validateTicket = (values: TicketType) => {
    const { title, description } = values;
    const errors: Partial<TicketType> = {};

    if (!title) {
        errors.title = "Title is required";
    }

    if (!description) {
        errors.description = "Description is required";
    }

    return errors;
}