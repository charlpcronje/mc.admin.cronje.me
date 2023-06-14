import { Client } from "@notionhq/client";
import type { NotionApiResponse, User } from "~~/types";
import { mapNotionApiResponseToUser } from "~~/server/utils/mapUsers";

const notion = new Client({ auth: process.env.NOTION_API_KEY! });
const DB = process.env.NOTION_USERS_DB!;

export async function getUsers():Promise<User[]> {
    
    const data:any = await notion.databases.query({
        database_id: DB
    });
    return mapNotionApiResponseToUser(data);
}


export async function getUserByEmail(email: string) {
    const data:any = await notion.databases.query({
        database_id: DB,
        filter: {
            property: 'Email Address',
            rich_text: {
                equals: email,
            },
        },
    });
    return mapNotionApiResponseToUser(data)[0];
}

export async function getUserByEmailAndPassword(email: string, password:string):Promise<User> {
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
    
    return mapNotionApiResponseToUser(data.results)[0];
}

export async function getUserById(id: number) {
    const data:any = await notion.databases.query({
        database_id: DB,
        filter: {
            property: 'ID',
            number: {
                equals: id,
            },
        },
    });
    return mapNotionApiResponseToUser(data.results)[0];
}

export async function isAdmin(user?: User) {
    return user && user.roles.includes("Admin");
}

export async function isManager(user?: User) {
    return user && user.roles.includes("Manager");
}

export async function isAgent(user?: User) {
    return user && user.roles.includes("Agent");
}

export async function isClient(user?: User) {
    return user && user.roles.includes("Client");
}

export async function isUser(user?: User) {
    return user && user.roles.includes("User");
}

export async function isGuest(user?: User) {
    const rolesToCheck = ['Admin', 'Manager', 'User', 'Agent'];
    const hasRoles = rolesToCheck.every(role => user!.roles);
    return !hasRoles;
}



