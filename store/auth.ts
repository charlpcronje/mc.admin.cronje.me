// store/auth.ts
import { error } from 'console';
import { defineStore } from 'pinia';
import jwt from 'jsonwebtoken';
const config = useRuntimeConfig();
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: config.notionApiKey });
const dbId = config.notionDB.users;

interface UserI {
    id: string;
    avatar?: string;
    fullName?: string;
    email: string;
    password: string;
    company?: string;
    roles?: string[];
}


export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: false,
    }),
    actions: {
        async authenticateUser(payload : UserI) {
            const response = await notion.databases.query({
                database_id: config.notionDB.users,
                filter: {
                    and: [
                        {
                            property: "Email Address",
                            email: {
                                equals: payload.email
                            }
                        },
                        {
                            property: "Password",
                            rich_text: {
                                equals: payload.password
                            }
                        }
                    ]
                }
            });

            // Extract the person's details from the response
            if (response.results.length > 0) {
                // Create and sign the token
                const token = jwt.sign({ username: payload.email }, config.secretKey, {
                    expiresIn: '1h',
                });
        
                // Save the token in a cookie
                const tokenCookie = useCookie('token');
                tokenCookie.value = token;
                this.authenticated = true;

                const data = response.results[0];

                // Get the avatar image URL
                const avatar = data.properties.Avatar.files[0].external.url;

                // Get the company page ID
                const companyId = data.properties.Company.relation[0].id;

                // Get the company page details
                const companyPage = await notion.pages.retrieve(companyId);

                // Get the company name
                const companyName = companyPage.properties.Name.title[0].plain_text;

                // Map the Notion row to a new Person object
                const user:UserI = {
                    id: data.id,
                    avatar: avatar,
                    fullName: data.properties["Full Name"].title[0].plain_text,
                    email: data.properties["Email Address"].email,
                    password: data.properties.Password.rich_text[0].plain_text,
                    company: companyName
                };
            } else {
                con
            }
        },
        logUserOut() {
            const token = useCookie('token');
            this.authenticated = false;
            token.value = null;
        },
    },
});
