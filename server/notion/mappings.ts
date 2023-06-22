import type { PageI, ResponseI } from "$notion/interfaces";
import { NotionUser, NotionCity, NotionBot } from "$notion/objects";

export function mapNotionToBot(response: PageI[] | ListI): Bot[] {
	if ('results' in response) {
		response = response.results;
	}
	console.log("Map Bots", { response });
	const bots: NotionBot[] = [];
	response.forEach((page: PageI) => {
		bots.push(new NotionBot(page));
	});
	return bots;
}

export function mapNotionToCity(response: PageI[] | ListI): City[] {
	if ('results' in response) {
		response = response.results;
	}
	console.log("Map Cities", { response });
	const cities: NotionCity[] = [];
	response.forEach((page: PageI) => {
		cities.push(new NotionCity(page));
	});
	return cities;
}


export function mapNotionToUser(response: PageI[] | ResponseI, returnPropsOnly: boolean = false): NotionUser[] | NotionUser["properties"] {
    if ('results' in response) {
        response = response.results;
    }
    console.log("Map Users", { response });
    const users: NotionUser[] = [];
    response.forEach((page: PageI) => {
        users.push(new NotionUser(page));
    });

    if (returnPropsOnly) return users.map(user => user.properties);
    return users;
}