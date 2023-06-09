import { Client } from "@notionhq/client";
import jwt from "jsonwebtoken"
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const dbId = process.env.NOTION_USERS_DB!;


interface UserI {
    id?: string;
    avatar?: string;
    fullName?: string;
    email: string;
    password: string;
    company?: string;
    roles?: string[];
}

async function getUserDetailsFromNotion(payload: UserI): Promise<UserI | null> {
    const response = await notion.databases.query({
        database_id: dbId,
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

    if (response.results.length > 0) {
        // Create and sign the token
        const token = jwt.sign({ username: payload.email }, process.env.SECRET_KEY!, {
            expiresIn: '1h',
        });

        // Save the token in a cookie
        const data:any = response.results[0];

        // Get the avatar image URL
        const avatar = data.properties.Avatar.files[0].external.url;

        // Get the company page ID
        const companyId = data.properties.Company.relation[0].id;

        // Get the company page details
        const companyPage = await notion.pages.retrieve(companyId);

        // Get the company name
        const companyName = companyPage.properties.Name.title[0].plain_text;

        // Map the Notion row to a new Person object
        const user: UserI = {
            id: data.id,
            avatar: avatar,
            fullName: data.properties["Full Name"].title[0].plain_text,
            email: data.properties["Email Address"].email,
            password: data.properties.Password.rich_text[0].plain_text,
            company: companyName
        };
        return user;
    } else {
        return null;
    }
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const user: UserI = {
        email: body.email,
        password: body.password
    }
    const result = await getUserDetailsFromNotion(user);
    const token: string = jwt.sign({ result.email }, process.env.SECRET_KEY!);
    return token;
});
