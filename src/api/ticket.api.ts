import axios from "axios";
import type { TicketType } from "../types/ticket";
import { getAuthToken } from "../utils/authToken";

const baseURI: string = import.meta.env.VITE_TICKET_URI;

export const createTicket = async (values: TicketType) => {
    const token = getAuthToken();
    if (!token) {
        return null;
    }
    const response = await axios.post(`${baseURI}`, values, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
}

export const getAllTickets = async () => {
    const token = getAuthToken();
    if (!token) {
        return null;
    }

    const response = await axios.get(`${baseURI}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
}