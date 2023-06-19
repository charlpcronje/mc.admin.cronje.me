import { Client } from "@notionhq/client";
import type { PageI, ResponseI } from "$serverInterfaces/notion";
import { NotionUser } from "$serverObjects/NotionUser";
const notion = new Client({ auth: process.env.NOTION_API_KEY! });
const DB = process.env.NOTION_USERS_DB!;

const User = class {


    constructor() {

    }

    mapNotionToUser(response: PageI[] | ResponseI): User[] {
        if ('results' in  response) {
            response = response.results;
        }
        console.log("Map Users", { response });
        const users: UserObj[] = [];
        response.forEach((page: PageI) => {
            users.push(new UserObj(page));
        });
        return users;
    }



    async getUserByEmail(email: string) {
        const data:any = await notion.databases.query({
            database_id: DB,
            filter: {
                property: 'Email Address',
                rich_text: {
                    equals: email,
                },
            },
        });
        const users = mapNotionToUser(data);
        console.log("userProperties",users[0].properties);
        return users;
    }

    async getUserByEmailAndPassword(email: string, password:string):Promise<User> {
        const data:any = await notion.databases.query({
            database_id: DB,
            filter: {
                and: [{
                        property: 'Email Address',
                        rich_text: {
                            equals: email,
                        },
                    },{
                        property: 'Password',
                        rich_text: {
                            equals: password,
                        },
                    },
                ],
            }
        });
        const users = mapNotionToUser(data);
        console.log("userProperties",users[0].properties);
        return users[0];
    }

    async getUserById(id: number) {
        const data:any = await notion.databases.query({
            database_id: DB,
            filter: {
                property: 'ID',
                number: {
                    equals: id,
                },
            },
        });
        return mapNotionToUser(data.results)[0];
    }

    async isAdmin(user?: User) {
        return user && user.properties.roles.includes("Admin");
    }

    async isManager(user?: User) {
        return user && user.properties.roles.includes("Manager");
    }

    async isAgent(user?: User) {
        return user && user.properties.roles.includes("Agent");
    }

    async isClient(user?: User) {
        return user && user.properties.roles.includes("Client");
    }

    async isUser(user?: User) {
        return user && user.properties.roles.includes("User");
    }

    async isGuest(user?: User) {
        const rolesToCheck = ['Admin', 'Manager', 'User', 'Agent'];
        const hasRoles = rolesToCheck.every(role => user!.properties.roles);
        return !hasRoles;
    }
};

export async function getUsers():Promise<NotionUser[]> {
    const data:any = await notion.databases.query({
        database_id: DB
    });
    const users = mapNotionToUser(data);
    console.log("userProperties",users[0].properties);
    return users;
}
