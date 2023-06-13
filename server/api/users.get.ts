import { Client } from "@notionhq/client";
import type { NotionApiResponse, User } from "~~/types";
import { mapNotionApiResponseToUser } from "~/utils/notion/mapUsers";

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

    const userData = await notion.databases.query({
        database_id: DB
    });
    return mapNotionApiResponseToUser(userData.results);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const usersWithoutPassword = usersWithPassword.map(({ password, ...user }) => user);
    //console.log({usersWithoutPassword   });
    //return usersWithoutPassword;
});