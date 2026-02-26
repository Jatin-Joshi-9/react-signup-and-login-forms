import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useState } from "react";
import type { LoginPropsType } from "../types/login";
import { validateLogin } from "../utils/validateFields";
import axios from "axios";
import { setAuthToken } from "../utils/authToken";
import { userLogin } from "../services/auth.service";

const initialValues: LoginPropsType = {
    email: "",
    password: "",
}

const Login = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (values: LoginPropsType) => {
        try {
            const data = await userLogin(values);
            if (data.success) {
                alert(data.message);
                setAuthToken(data.data.token);
                navigate("/");
            }
            console.log(data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "Something went wrong. Try again");
            }
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
            <div className="w-full p-8 max-w-md bg-white rounded-2xl border border-neutral-200 space-y-6">
                <h1 className="text-xl sm:text-2xl text-center font-extrabold">Welcome Back</h1>

                <Formik
                    initialValues={initialValues}
                    validate={validateLogin}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="flex flex-col gap-4">
                            <InputField
                                label="Email"
                                name="email"
                                type="email"
                            />
                            <InputField
                                label="Password"
                                name="password"
                                type="password"
                            />

                            <div className="mt-2">
                                <Button
                                    label="Login"
                                    type="submit"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>

                {error ? (
                    <div className="text-sm text-red-500 text-center">{error}</div>
                ) : null}

                <p className="text-sm sm:text-base text-center text-neutral-500">
                    Don't have an account?&nbsp;
                    <Link to="/signup" className="text-sky-800 font-semibold hover:underline">
                        Signup
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default Login;