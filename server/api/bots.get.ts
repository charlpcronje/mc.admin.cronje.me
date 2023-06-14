import { Client } from "@notionhq/client";
import type { NotionApiResponse, Bot } from "~~/types";
import { mapNotionApiResponseToBot } from "~~/server/utils/mapBots";

const notion = new Client({ auth: process.env.NOTION_API_KEY! });
const DB = process.env.NOTION_BOTS_DB!;

import { isAdmin, isUser, isAgent, isManager } from "~/server/models/user";

export default defineEventHandler(async (event) => {
    if (!isAdmin(event.context.user) && !isAgent(event.context.user) && !isManager(event.context.user)) {
        return createError({
            statusCode: 401,
            message: "You don't have the rights to access this resource",
        });
    }

    const data:any = await notion.databases.query({
        database_id: DB
    });
    const usersWithPassword = mapNotionApiResponseToBot(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const usersWithoutPassword = usersWithPassword.map(({ password, ...user }) => user);
    return usersWithoutPassword;
});