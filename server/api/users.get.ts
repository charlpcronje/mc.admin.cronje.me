import { Client } from "@notionhq/client";
import type { User } from "~~/server/utils/objects";

const notion = new Client({ auth: process.env.NOTION_API_KEY! });
const DB = process.env.NOTION_USERS_DB!;

import { getUsers, isAdmin } from "~/server/models/user";

export default defineEventHandler(async (event) => {
    if (!isAdmin(event.context.user)) {
        return createError({
            statusCode: 401,
            message: "You don't have the rights to access this resource",
        });
    }
    const usersWithPassword: User[] = await getUsers();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userProperties = usersWithPassword.properties;
    const usersWithoutPassword = usersWithPassword.map(({ password, ...userProperties }) => user);
});