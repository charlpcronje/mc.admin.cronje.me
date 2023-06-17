import type { PageI, ListI } from "./types";
import { City } from "./objects";

export function mapNotionToCity(response: PageI[] | ListI): City[] {
	if ('results' in response) {
		response = response.results;
	}
	console.log("Map Cities", { response });
	const cities: City[] = [];
	response.forEach((page) => {
		cities.push(new City(page));
	});
	return cities;
}
