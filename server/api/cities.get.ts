import { Client } from "@notionhq/client";
import { NotionCity } from "$notion/objects";
import { mapNotionToCity } from "$notion/mappings";
import { useAuth } from "~/composables/auth";
import { User } from "$models/user";

const notion = new Client({ auth: process.env.NOTION_API_KEY! });
const DB = process.env.NOTION_CITIES_DB!;
const { me } = useAuth();
const user = new User(me);

export default defineEventHandler(async (event) => {
    if (user.isGuest) {
        return createError({
            statusCode: 401,
            message: "You don't have the rights to access this resource",
        });
    }

    const data: any = await notion.databases.query({
        database_id: DB
    });
    const cities: NotionCity[] = mapNotionToCity(data);
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