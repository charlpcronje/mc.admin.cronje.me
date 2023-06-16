import type { PageI, ListI } from "~~/types";
import { Bot } from "~~/objects";

export function mapNotionApiResponseToBot(response: PageI[] | ListI): Bot[] {
  if ('results' in response) {
    response = response.results;
  }
  console.log(response);
  const bots: Bot[] = [];
  response.forEach((page) => {
      bots.push(new Bot(page));
  });
  return bots
}
