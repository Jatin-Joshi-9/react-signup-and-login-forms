import axios from "axios";
import type { SignupPropsType } from "../types/signup";
import type { LoginPropsType } from "../types/login";

const baseURI: string = import.meta.env.VITE_AUTH_URI;

export const userSignup = async (values: SignupPropsType) => {
    const response = await axios.post(`${baseURI}/register`, values);
    return response.data;
}

export const userLogin = async (values: LoginPropsType) => {
    const response = await axios.post(`${baseURI}/login`, values);
    return response.data;
}