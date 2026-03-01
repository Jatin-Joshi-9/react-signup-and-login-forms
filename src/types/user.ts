export interface User {
    id: string;
    name: string;
    email: string;
    role: "CUSTOMER" | "SUPPORT_AGENT";
    permissions: string[]; 
}