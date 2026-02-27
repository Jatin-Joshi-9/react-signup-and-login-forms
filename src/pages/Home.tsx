import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAuthToken } from "../utils/authToken";
import { useEffect } from "react";
import CreateTicket from "../components/CreateTicket";

const Home = () => {
    const token = getAuthToken();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token]);

    return (
        <>
            <Navbar />

            <CreateTicket />
        </>
    )
}

export default Home;