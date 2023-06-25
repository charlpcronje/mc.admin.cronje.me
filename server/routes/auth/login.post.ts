import { getUserByEmailAndPassword } from "~/models/user";
import { User } from "~/models/user";
import {UserPropertiesI} from "~/notion/types";

export default eventHandler(async (event):Promise<UserPropertiesI> => {
    const body = await readBody<{ email: string; password: string; rememberMe: boolean }>(event);
    
    event.context.session.user = {};
    const { email, password, rememberMe } = body;

    if (!email || !password) {
        return createError({
            statusCode: 400,
            message: "Email address and password are required",
        });
    }

    const userWithPassword = await getUserByEmailAndPassword(email,password);
    console.log("USER WITH PASSWORD");
    console.log(userWithPassword);

    if (!userWithPassword) {;
        return createError({
            statusCode: 401,
            message: "Bad credentials"
        });
    }

    if (!userWithPassword.properties.status) {
        return createError({
            statusCode: 401,
            message: "User Deactivated"
        });
    }

    event.context.session.user = {};
    const user = new User(userWithPassword.properties);
    if (user) {
        event.context.session.user = user;
    }

    /* When passwords will be encrypted for now the
    password is verified by filtering on email and password from notion
    const verified = await verify(password, userWithPassword.password);

    if (!verified || userWithPassword) {
        return createError({
            statusCode: 401,
            message: "Bad credentials",
        });
    }
    */
    const config = useRuntimeConfig();

    const session = serialize({ userId: userWithPassword.properties.id });
    const signedSession = sign(session, config.cookieSecret);

    setCookie(event, config.cookieName, signedSession, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        expires: rememberMe
            ? new Date(Date.now() + config.cookieRememberMeExpires)
            : new Date(Date.now() + config.cookieExpires),
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = userWithPassword.properties;

    return {
        user: userWithoutPassword,
    };
});
