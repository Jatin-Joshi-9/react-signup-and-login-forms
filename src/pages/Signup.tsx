import { Form, Formik } from "formik";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import type { SignupPropsType } from "../types/signup";
import { validateSignup } from "../utils/validateFields";
import axios from "axios";
import { userSignup } from "../api/auth.api";
import toast from "react-hot-toast";
import Error from "../components/Error";

const initialValues: SignupPropsType = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const Signup = (): React.JSX.Element => {
    const navigate = useNavigate();

    const handleSubmit = async (values: SignupPropsType) => {
        try {
            const data = await userSignup(values);
            if (data.success) {
                toast.success(data.message);
                navigate("/login");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Something went wrong. Try again");
            }
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
            <div className="w-full p-8 max-w-md bg-white rounded-2xl border border-neutral-200">

                <div className="mb-6">
                    <h1 className="text-xl sm:text-2xl text-center font-extrabold">Create an account</h1>
                </div>

                <Formik
                    initialValues={initialValues}
                    validate={validateSignup}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="flex flex-col gap-4">
                            <InputField
                                label="Full Name"
                                name="name"
                                type="text"
                            />
                            <Error name="name" />
                            <InputField
                                label="Email"
                                name="email"
                                type="email"
                            />
                            <Error name="email" />
                            <InputField
                                label="Password"
                                name="password"
                                type="password"
                            />
                            <Error name="password" />
                            <InputField
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                            />
                            <Error name="confirmPassword" />

                            <div className="mt-2">
                                <Button
                                    label="Sign Up"
                                    type="submit"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>

                <p className="text-sm sm:text-base text-center text-neutral-500 mt-6">
                    Already have an account?&nbsp;
                    <Link to="/login" className="text-sky-800 font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default Signup;