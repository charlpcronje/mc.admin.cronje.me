import { useAuthUser } from "./useAuthUser";
import { User } from "~/models/user";
import { UserPropertiesI } from "$notion/interfaces";

export const useAuth = () => {
    const authUser = useAuthUser();

    const setUser = (user: UserPropertiesI | undefined) => {
        authUser.value = new User(user);
    };

    const setCookie = (cookie: any) => {
        cookie.value = cookie;
    };

    const login = async (email: string, password: string, rememberMe: boolean) => {
        const data:any = await $fetch("/auth/login", {
            method: "POST",
            body: {
                email,
                password,
                rememberMe,
            },
        });

        setUser(data.user);
        return authUser;
    };

    const logout = async () => {
        const data = await $fetch("/auth/logout", {
            method: "POST",
        });

        setUser(data.user);
    };

    const me = async () => {
        if (!authUser.value) {
            try {
                const data:any = await $fetch("/auth/me", {
                    headers: useRequestHeaders(["cookie"]) as HeadersInit,
                });

                setUser(data.user);
            } catch (error) {
                setCookie(null);
            }
        }

        return authUser;
    };

    return {
        login,
        logout,
        me
    };
};
