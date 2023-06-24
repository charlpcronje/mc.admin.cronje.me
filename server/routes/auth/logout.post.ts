import { User } from "$models/user";
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    deleteCookie(event, config.cookieName, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: ENV.isProd,
    });

    return {
        user: new User({}),
    };
});
