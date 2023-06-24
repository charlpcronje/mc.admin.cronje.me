import type { PageI, ResponseI, UserPropertiesI } from "$notion/interfaces";
import { Client } from "@notionhq/client";
const notion = new Client({ auth: process.env.NOTION_API_KEY! });
const DB = process.env.NOTION_USERS_DB!;
import { NotionUser } from "$notion/objects";
import { mapNotionToUser } from '$notion/mappings';

export const User = (() => {
    let instance: User | null = null;
    type role = "Admin" | "Agent" | "Client" | "Manager";

    class User implements UserPropertiesI {
        [key: string]: any;
        id?: number;
        status: boolean = true;
        avatar?: string;
        fullName?: string;
        emailAddress?: string;
        password?: string;
        company?: string;
        roles?: role[] = [];
        companyRelation?: string;

        constructor(user?: UserPropertiesI) {
            // If new User details are passed then the singleton will be overwritten with the new user's details             
            if (user && user.id) {
                Object.assign(this, user);
                instance = this;
            }
            // If no new User details are passed then the singleton will be returned
            if (!instance) {
                instance = this;
            }

            if (!instance && !user) {
                throw new Error("User is not logged in");
            }
            return instance;
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

    /* experiment with calling getters statically
    const handler: ProxyHandler<typeof User> = {
        construct(target: any, args: any[]): any {
            const instance = new target(...args);
            return instance;
        },

        get(target: UserPropertiesI, prop: string): any {
            if (prop in target) {
                return target[prop];
            }
            
            const user = new User();
            if (typeof user[prop] === "function") {
              return function (...args: any[]) {
                return user[prop].apply(target, args);
              };
            }
            return createError({
                statusCode: 500,
                message: `Method ${prop} not found on User.`,
            });
        },
    };

    const handlerr = {
        get(target: any, prop: any, receiver: any) {
          const value = target[prop];
          const isGetter = Object.getOwnPropertyDescriptor(target.prototype, prop)?.get;
      
          if (typeof value === "function" || isGetter) {
            return function (this: any, ...args: any[]) {
                if (this instanceof target) {
                    return value.apply(this, args);
                } else {
                    const instance = new target(args[0]); // Pass the constructor argument here
                    return Reflect.get(instance, prop, receiver);
                }
            };
          }
      
          return value;
        },
      };

    const UserProxy = new Proxy(User, handlerr)
    */
    return User;
    
})();

export const user = new User();


async function getUserByEmail(email: string) {
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

async function getUserByEmailAndPassword(email: string, password:string) {
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

async function getUserById(id: number) {
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




