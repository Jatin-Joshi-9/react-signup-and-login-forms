import React, { createContext, useEffect, useState } from "react";
import type { User } from "../types/user";
import { getCurrentUser } from "../api/user.api";
import { removeAuthToken } from "../utils/authToken";
import type { UserContextType } from "../types/context";

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    loading: true,
    fetchCurrentUser: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchCurrentUser = async () => {
        try {
            const data = await getCurrentUser();
            setUser(data);
        } catch {
            setUser(null);
            removeAuthToken();
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, fetchCurrentUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;