import Cookies from "js-cookie";

export const setAuthToken = (token: string) => {
    Cookies.set("token", token, {
        path: "/",
        expires: 2,
        sameSite: "Strict",
    });
};

export const getAuthToken = () => {
    return Cookies.get("token");
};

export const removeAuthToken = () => {
    return Cookies.remove("token");
}