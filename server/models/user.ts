import { Client } from "@notionhq/client";
import type { User } from "~~/types";
import { mapNotionApiResponseToUser } from "~/utils/notion/mapUsers";

const notion = new Client({ auth: process.env.NOTION_API_KEY! });
const DB = process.env.NOTION_USERS_DB!;

export async function getUsers() {
    const data:any = await notion.databases.query({
        database_id: DB
    });

    return mapNotionApiResponseToUser(data.response);
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
    return mapNotionApiResponseToUser(data.response);
}

export async function getUserByEmailAndPassword(email: string, password:string):Promise<User | User[]> {
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
    
    const user = mapNotionApiResponseToUser(data.response);
    console.log("user",{user});
    return user;
}

export async function getUserById(id: string) {
    const data:any = await notion.databases.query({
        database_id: DB,
        filter: {
            property: 'id',
            rich_text: {
                equals: id,
            },
        },
    });
    return mapNotionApiResponseToUser(data.response);
}

export async function isAdmin(user?: User) {
    return user && user.roles.includes("Admin");
}
