import type { PageI, ResponseI, UserPropertiesI } from "~/notion/types";
import { Client } from "@notionhq/client";
const notion = new Client({ auth: process.env.NOTION_API_KEY! });
const DB = process.env.NOTION_USERS_DB!;
import type { role } from "~/notion/types";
import { NotionUser } from "~/notion/objects";
import { mapNotionToUser } from '~/notion/mappings';

export const User = (() => {

    class User implements UserPropertiesI {
        [key: string]: any;
        id: number;
        status: boolean = true;
        avatar?: string;
        fullName: string;
        emailAddress: string;
        password: string;
        company?: string;
        roles?: role[];
        companyRelation?: string;

        constructor(user: UserPropertiesI) {
            console.log(user);
            this.id = user.id;
            this.status = user.status;
            this.avatar = user.avatar;
            this.fullName = user.fullName;
            this.emailAddress = user.emailAddress;
            this.password = user.password;
            this.company = user.company;
            this.roles = user.roles;
            this.companyRelation = user.companyRelation;
        }

        toJSON() {
            return {
                id : this.id,
                status : this.status,
                avatar : this.avatar,
                fullName : this.fullName,
                emailAddress : this.emailAddress,
                password : this.password,
                company : this.company,
                roles : this.roles,
                companyRelation : this.companyRelation
            };
        }

        get isLogged(): boolean {
            return !!this.id;
        }

        hasRole(role: role): boolean {
            if (!this.roles) return false;
            return this.roles.includes(role);
        }

        // User Roles
        get isAdmin() {
            return this.hasRole("Admin");
        }
        get isAgent() {
            return this.hasRole("Agent");
        }
        get isManager() {
            return this.hasRole("Manager");
        }
        get isClient() {
            return this.hasRole("Client");
        }

        // No User Roles
        get isGuest() {
            return !this.isAdmin && !this.isAgent && !this.isManager && !this.isClient;
        }
    }
    return User;
    
})();

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
    const user = mapNotionToUser(data);
    return new NotionUser(user[0].properties);
}

export async function getUserByEmailAndPassword(email: string, password:string) {
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
    return mapNotionToUser(data)[0];
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

export async function getUsers():Promise<NotionUser[] | UserPropertiesI[]> {
    const data:any = await notion.databases.query({
        database_id: DB
    });
    const users = mapNotionToUser(data);
    return users;
}




