import { Client } from "@notionhq/client";
import { City } from "~/types/objects";
import { mapNotionToCity } from "~~/server/utils/mapCities";

const notion = new Client({ auth: process.env.NOTION_API_KEY! });
const DB = process.env.NOTION_CITIES_DB!;

import { isAdmin, isAgent, isManager } from "~/server/models/user";

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
    const cities: City[] = mapNotionToCity(data);
    return cities;
});


/**

import { Client } from "@notionhq/client";
const config = useRuntimeConfig();

const notion = new Client({ auth: config.notionApiKey });
const DB = config.notionDB.cities;

let payload = [];

async function getImages() {
  const data = await notion.databases.query({
    database_id: DB
  });
  return data;
}

getImages().then((data) => {
  payload = data.results;
});

function getUrls(results) {
  let urls = [];
  results.forEach((result) => {
    urls.push(result.properties.file.files[0].file.name);
  });
}


export default defineEventHandler(() => payload); */