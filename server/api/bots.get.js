// @ts-check

import { Client } from "@notionhq/client";

const config = useRuntimeConfig();
const notion = new Client({ auth: config.notionApiKey });
const DB = config.notionDB.bots;
const users = [];
/**
 * Pay Load
 * @type {import("h3").EventHandlerResponse<any[]>}
 */
let payload = [];

async function getData() {
  const data = await notion.databases.query({
    database_id: DB
  });
  return data;
}


/**
 * @param {Array<any>} data
 */
getData().then((data) => {
  payload = data.results;
});

/**
 * @param {Array<any>} results 
 */
function getUrls(results) {
  let urls = [];
  results.forEach((result) => {
    urls.push(result.properties.file.files[0].file.name);
  });
}


export default defineEventHandler(() => payload);