import { Client } from "@notionhq/client";
import { NotionCity } from "~/notion/objects";
import { mapNotionToCity } from "~/notion/mappings";
import { createPinia, setActivePinia } from "pinia";
const pinia = createPinia();
setActivePinia(pinia);
import { useUserStore } from "~/stores/user";
import { CityPropertiesI } from "~/notion/types";

const notion = new Client({ auth: process.env.NOTION_API_KEY! });
const DB = process.env.NOTION_CITIES_DB!;
const {userState} = useUserStore();

export default defineEventHandler(async () => {
    if (userState.value.isGuest) {
        return createError({
            statusCode: 401,
            message: "You don't have the rights to access this resource",
        });
    }

    const data: any = await notion.databases.query({
        database_id: DB
    });
    const cities: NotionCity[] | CityPropertiesI[] = mapNotionToCity(data);
    return cities;
});