import { Client } from "@notionhq/client";
const config = useRuntimeConfig();

const notion = new Client({ auth: config.notionApiKey });
const DB = config.notionDB.regions;

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