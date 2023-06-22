import type { PageI, ResponseI, UserPropertiesI } from "$notion/interfaces";
import { NotionUser } from "$notion/objects";



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
        roles?: role[];
        companyRelation?: string;

        constructor(user?: UserPropertiesI, from?: string) {
            // If new User details are passed then the singleton will be overwritten with the new user's details             
            if (user) {
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
            return !this.hasRole("Admin") && !this.hasRole("Agent") && !this.hasRole("Manager") && !this.hasRole("Client");
        }



        static async getUserById(id: number) {
            const data: any = await notion.databases.query({
                database_id: DB,
                filter: {
                    property: 'ID',
                    number: {
                        equals: id,
                    },
                },
            });
            return User.mapNotionToUser(data.results)[0];
        }

        static async isAdmin(user?: NotionUser) {
            return user && user.properties.roles.includes("Admin");
        }

        static async isManager(user?: NotionUser) {
            return user && user.properties.roles.includes("Manager");
        }

        static async isAgent(user?: NotionUser) {
            return user && user.properties.roles.includes("Agent");
        }

        static async isClient(user?: NotionUser) {
            return user && user.properties.roles.includes("Client");
        }

        static async isUser(user?: NotionUser) {
            return user && user.properties.roles.includes("User");
        }

        static async isGuest(user?: NotionUser) {
            return user && !User.isAdmin(user) && !User.isManager(user) && !User.isAgent(user) && !User.isClient(user);

        }

        public getUserInfo(): void {
            // Your user-related logic here
        }
    }


    const handler: ProxyHandler<typeof User> = {
        get: function (target: UserPropertiesI, prop: string, receiver) {
            if (prop in target) {
                return target[prop];
            }

            return function (...args: any[]) {
                if (ENV.isDev) {

                }
                console.log(`Called non-existent static method ${String(prop)}.`);

                // Pass the arguments to another method
                target.anotherMethod.apply(target, args);
            };
        }
    };

    const UserProxy = new Proxy<typeof User>(User, handler)


    return User;
})();


