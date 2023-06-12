import { Client } from "@notionhq/client";
import type { User } from "~~/types";

const notion = new Client({ auth: process.env.NOTION_API_KEY! });
const DB = process.env.NOTION_USERS_DB!;

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


export default defineEventHandler(() => payload);