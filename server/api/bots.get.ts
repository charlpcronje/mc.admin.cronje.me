import { Client } from "@notionhq/client";
import { NotionBot } from "~/notion/objects";
import { mapNotionToBot } from "~/notion/mappings";
import { user } from "~/models/user";
import { BotPropertiesI } from "~/notion/types";

const notion = new Client({ auth: process.env.NOTION_API_KEY! });
const DB = process.env.NOTION_BOTS_DB!;

export default defineEventHandler(async (event) => {
    if (user.isGuest) {
        return createError({
            statusCode: 401,
            message: "You don't have the rights to access this resource",
        });
    }

    const data:any = await notion.databases.query({
        database_id: DB
    });
    const bots: NotionBot[] | BotPropertiesI[] = mapNotionToBot(data);
    return bots;
});