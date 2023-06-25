import { User } from "~/models/user";
export default defineEventHandler(async (event:any) => {
    const config = useRuntimeConfig();

    deleteCookie(event, config.cookieName, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV != 'development',
    });

    return {
        user: new User({}),
    };
});
