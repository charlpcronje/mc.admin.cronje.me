import { NotionUser, getUsers } from "$notion/objects";
import { user } from "$models/user";
import { UserPropertiesI } from "$notion/interfaces";

export default defineEventHandler(async (event) => {
    if (!user.isAdmin) {
        return createError({
            statusCode: 401,
            message: "You don't have the rights to access this resource",
        });
    }

    const usersWithPassword: NotionUser[] | UserPropertiesI[] = await getUsers();
    const usersWithoutPassword = usersWithPassword.map(user => {
        const { password, ...userWithoutPassword } = user.properties;
        return { ...user, properties: userWithoutPassword };
    });
    return usersWithoutPassword;
});