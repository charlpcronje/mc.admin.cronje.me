import type { NotionUser, getUsers } from "$notion/objects";
import { User } from "$models/user";

export default defineEventHandler(async (event) => {
    if (!User.isAdmin(event.context.user)) {
        return createError({
            statusCode: 401,
            message: "You don't have the rights to access this resource",
        });
    }

    const usersWithPassword: NotionUser[] = await getUsers();
    const usersWithoutPassword = usersWithPassword.map(user => {
        const { password, ...userWithoutPassword } = user.properties;
        return { ...user, properties: userWithoutPassword };
    });
    return usersWithoutPassword;
});