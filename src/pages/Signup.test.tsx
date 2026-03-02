import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Signup from "./Signup";
import * as authApi from "../api/auth.api"
import toast from "react-hot-toast";

vi.mock("../api/auth.api");
vi.mock("react-hot-toast");

const mockedNavigate = vi.fn();

vi.mock("react-router-dom", async () => ({
    ...await vi.importActual("react-router-dom"),
    useNavigate: () => mockedNavigate,
}));

const renderComponent = () => {
    render(
        <BrowserRouter>
            <Signup />
        </BrowserRouter>
    )
}

beforeEach(() => {
    vi.clearAllMocks();
    renderComponent();
});

const fillForm = () => {
    fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "Raj" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "raj@gmail.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "R@jdd123" } });
    fireEvent.change(screen.getByLabelText("Confirm Password"), { target: { value: "R@jdd123" } });
};

describe("Test Signup Component", () => {
    it("should render signup form correctly", () => {
        expect(screen.getByText("Create an account")).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: "Full Name" })).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
    });

    it("submits form successfully and navigates to login", async () => {
        vi.spyOn(authApi, "userSignup").mockResolvedValue({
            success: true,
            message: "Signup successful",
        });

        fillForm();
        fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

        await waitFor(() => {
            expect(authApi.userSignup).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalledWith("Signup successful");
            expect(mockedNavigate).toHaveBeenCalledWith("/login");
        });
    });

    it("Do nothing when signup success is false", async () => {
        vi.spyOn(authApi, "userSignup").mockResolvedValue({
            success: false,
        });

        fillForm();
        fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

        await waitFor(() => {
            expect(authApi.userSignup).toHaveBeenCalled();
        });
    });

    it("shows error toast when API fails", async () => {
        vi.spyOn(authApi, "userSignup").mockRejectedValue({
            isAxiosError: true,
            response: {
                data: {
                    message: "Email already exists",
                },
            },
        });

        fillForm();
        fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Email already exists");
        });
    });

    it("shows fallback error message when API returns no message", async () => {
        vi.spyOn(authApi, "userSignup").mockRejectedValue({
            isAxiosError: true,
            response: { data: {} },
        });

        fillForm();
        fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Something went wrong. Try again");
        });
    });

    it("shows fallback error message when API returns no message", async () => {
        vi.spyOn(authApi, "userSignup").mockRejectedValue(new Error("Failed"));

        fillForm();
        fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

        await waitFor(() => {
            expect(authApi.userSignup).toHaveBeenCalled();
        });
    });
})