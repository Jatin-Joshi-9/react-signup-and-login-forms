import * as Yup from "yup";

export const signupSchema = Yup.object({
    name: Yup
        .string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),

    email: Yup
        .string()
        .email("Enter a valid email address")
        .required("Email is required"),

    password: Yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),

    confirmPassword: Yup
        .string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Please confirm your password"),
});