import { Client } from "@notionhq/client";
import { User } from "~/types/objects";
import { mapNotionToUser } from "~~/server/utils/mapUsers";

const notion = new Client({ auth: process.env.NOTION_API_KEY! });
const DB = process.env.NOTION_REGIONS_DB!;

export async function getRegions():Promise<User[]> {
    const data:any = await notion.databases.query({
        database_id: DB
    });
    const users = mapNotionToUser(data);
    console.log("userProperties",users[0].properties);
    return users;
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
    const users = mapNotionToUser(data);
    console.log("userProperties",users[0].properties);
    return users;
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
    const users = mapNotionToUser(data);
    console.log("userProperties",users[0].properties);
    return users[0];
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
    return mapNotionToUser(data.results)[0];
}

export async function isAdmin(user?: User) {
    return user && user.properties.roles.includes("Admin");
}

export async function isManager(user?: User) {
    return user && user.properties.roles.includes("Manager");
}

export async function isAgent(user?: User) {
    return user && user.properties.roles.includes("Agent");
}

export async function isClient(user?: User) {
    return user && user.properties.roles.includes("Client");
}

export async function isUser(user?: User) {
    return user && user.properties.roles.includes("User");
}

export async function isGuest(user?: User) {
    const rolesToCheck = ['Admin', 'Manager', 'User', 'Agent'];
    const hasRoles = rolesToCheck.every(role => user!.properties.roles);
    return !hasRoles;
}



