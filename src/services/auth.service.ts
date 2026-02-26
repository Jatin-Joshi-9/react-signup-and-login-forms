import axios from "axios";
import type { SignupPropsType } from "../types/signup";

const baseURI: string = import.meta.env.VITE_AUTH_URI;

export const userSignup = async (values: SignupPropsType) => {
    const response = await axios.post(`${baseURI}/register`, values);
    return response.data;
}