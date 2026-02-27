import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import CreateTicket from "../pages/CreateTicket";
import ViewTicket from "../pages/ViewTicket";
import Tickets from "../pages/Tickets";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/tickets/create" element={
                    <ProtectedRoute>
                        <CreateTicket />
                    </ProtectedRoute>
                } />
                <Route path="/tickets" element={
                    <ProtectedRoute>
                        <Tickets />
                    </ProtectedRoute>
                } />
                <Route path="/tickets/:id" element={
                    <ProtectedRoute>
                        <ViewTicket />
                    </ProtectedRoute>
                } />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes