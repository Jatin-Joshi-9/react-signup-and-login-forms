import type { LoginValuesProps } from "../types/login";
import type { SignupPropsType } from "../types/signup";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/;
const nameRegex = /^(?!.*\d)[a-zA-Z\s]{2,50}$/;

export const validateSignup = (values: SignupPropsType) => {
    const { name, email, password, confirmPassword } = values;
    const errors: Partial<SignupPropsType> = {};

    if (!name) {
        errors.name = "Name is required";
    } else if (!nameRegex.test(name)) {
        errors.name = "Name must only contain letters";
    }

    if (!email) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
        errors.email = "Enter a valid email"
    } else if (email.length > 100) {
        errors.email = "Email must not exceed 100 characters"
    }

    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 8 || password.length > 16) {
        errors.password = "Password must be 8 to 16 characters long";
    } else if (!passwordRegex.test(password)) {
        errors.password = "Password must include uppercase, lowercase, number & special character";
    }

    if (!confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
}

export const validateLogin = (values: LoginValuesProps) => {
    const { email, password } = values;
    const errors: Partial<LoginValuesProps> = {};

    if (!email) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
        errors.email = "Enter a valid email address"
    }

    if (!password) {
        errors.password = "Password is required";
    }

    return errors;
}