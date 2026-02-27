import React, { createContext, useContext, useState } from "react";
import type { SignupPropsType } from "../types/signup";

type UserContextType = {
    userData:SignupPropsType | null;
    setUserData: (data: SignupPropsType | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userData, setUserData] = useState<SignupPropsType | null>(null);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext);
}