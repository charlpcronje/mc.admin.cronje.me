import type { User } from "$serverObjects/notion";
import { getUsers, isAdmin } from "#serverModels/user";

export default defineEventHandler(async (event) => {
    if (!isAdmin(event.context.user)) {
        return createError({
            statusCode: 401,
            message: "You don't have the rights to access this resource",
        });
    }

    const usersWithPassword: User[] = await getUsers();
    const usersWithoutPassword = usersWithPassword.map(user => {
        const { password, ...userWithoutPassword } = user.properties;
        return { ...user, properties: userWithoutPassword };
    });
    return usersWithoutPassword;
});