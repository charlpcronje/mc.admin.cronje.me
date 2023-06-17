import type { PageI, ListI } from "./types";
import { Bot } from "./objects";

export function mapNotionToBot(response: PageI[] | ListI): Bot[] {
	if ('results' in response) {
		response = response.results;
	}
	console.log("Map Bots", { response });
	const bots: Bot[] = [];
	response.forEach((page) => {
		bots.push(new Bot(page));
	});
	return bots;
}
