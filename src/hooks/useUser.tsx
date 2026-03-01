import { useContext } from "react";
import UserContext from "../context/UserContext";

const useUser = () => {
    const userContext = useContext(UserContext);

    return userContext;
}

export default useUser;