import { Client } from "@notionhq/client";
import type { NotionApiResponse, User } from "~~/types";
import { mapNotionApiResponseToUser } from "~/utils/notion/mapUsers";
import { AnyAaaaRecord } from "dns";

const notion = new Client({ auth: process.env.NOTION_API_KEY! });
const DB = process.env.NOTION_USERS_DB!;

export async function getUsers() {
    
    const userData = await notion.databases.query({
        database_id: DB
    });
    return mapNotionApiResponseToUser(userData);
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
