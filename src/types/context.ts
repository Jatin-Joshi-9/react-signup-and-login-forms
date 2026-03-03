import type { User } from "./user";

export type UserContextType = {
    user: User | null;
    setUser: (data: User | null) => void;
    loading: boolean;
    fetchCurrentUser: () => Promise<void>;
}
 