import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";
import { getAuthToken } from "../utils/authToken";
import { useEffect } from "react";

const Home = () => {
    const context = useUser();
    const username = context?.userData?.name;
    const token = getAuthToken();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token]);

    return (
        <>
            <Navbar username={username} />
        </>
    )
}

export default Home;