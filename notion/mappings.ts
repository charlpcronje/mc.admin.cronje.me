import type { MallPropertiesI, PageI, RegionPropertiesI, ResponseI, UserPropertiesI, CompanyPropertiesI, BotPropertiesI, CityPropertiesI } from "$notion/interfaces";
import { NotionUser, NotionCity, NotionBot, NotionRegion, NotionCompany, NotionMall } from "$notion/objects";

export function mapNotionToMall(response: PageI[] | ResponseI,returnPropsOnly: boolean = false): NotionMall[] | MallPropertiesI[] {
	if ('results' in response) {
		response = response.results;
	}
	const malls: NotionMall[] = [];
	response.forEach((page: PageI) => {
		malls.push(new NotionMall(page));
	});
	if (returnPropsOnly) return malls.map(mall => mall.properties);
	return malls;
}

export function mapNotionToCompany(response: PageI[] | ResponseI,returnPropsOnly: boolean = false): NotionCompany[] | CompanyPropertiesI[] {
	if ('results' in response) {
		response = response.results;
	}
	const companies: NotionCompany[] = [];
	response.forEach((page: PageI) => {
		companies.push(new NotionCompany(page));
	});
	if (returnPropsOnly) return companies.map(company => company.properties);
	return companies;
}

export function mapNotionToRegion(response: PageI[] | ResponseI,returnPropsOnly: boolean = false): NotionRegion[] | RegionPropertiesI[] {
	if ('results' in response) {
		response = response.results;
	}
	const regions: NotionRegion[] = [];
	response.forEach((page: PageI) => {
		regions.push(new NotionRegion(page));
	});
	if (returnPropsOnly) return regions.map(region => region.properties);
	return regions;
}

export function mapNotionToBot(response: PageI[] | ResponseI,returnPropsOnly: boolean = false): NotionBot[] | BotPropertiesI[] {
	if ('results' in response) {
		response = response.results;
	}
	const bots: NotionBot[] = [];
	response.forEach((page: PageI) => {
		bots.push(new NotionBot(page));
	});
	if (returnPropsOnly) return bots.map(bot => bot.properties);
	return bots;
}

export function mapNotionToCity(response: PageI[] | ResponseI,returnPropsOnly: boolean = false): NotionCity[] | CityPropertiesI[] {
	if ('results' in response) {
		response = response.results;
	}
	const cities: NotionCity[] = [];
	response.forEach((page: PageI) => {
		cities.push(new NotionCity(page));
	});
	if (returnPropsOnly) return cities.map(city => city.properties);
	return cities;
}


export function mapNotionToUser(response: PageI[] | ResponseI, returnPropsOnly: boolean = false):NotionUser[] | UserPropertiesI[] {
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