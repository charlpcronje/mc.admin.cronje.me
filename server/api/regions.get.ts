import { Client } from "@notionhq/client";
import { NotionRegion } from "~/notion/objects";
import { mapNotionToRegion } from "~/notion/mappings";
import { user } from "~/models/user";
import { RegionPropertiesI } from "~/notion/types";

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
    const regions: NotionRegion[] | RegionPropertiesI[] = mapNotionToRegion(data);
    return regions;
});