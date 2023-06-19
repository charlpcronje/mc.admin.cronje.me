import type { PageI, ResponseI } from "$serverInterfaces/notion";
import { NotionUser } from "$serverObjects/NotionUser";

export function mapNotionToUser(response: PageI[] | ResponseI, returnPropsOnly: boolean = true): NotionUser[] | NotionUser["properties"][] {
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