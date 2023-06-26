import { Session } from "~/utils/Session";
export default defineEventHandler(async (event) => {
    const user = await Session.getUserFromSession();

    if (user) event.context.user = user;
});
