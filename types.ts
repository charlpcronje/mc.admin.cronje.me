export interface NotionApiResponse {
    // JSON response structure from the Notion API
    // Define only the necessary properties for mapping
    results: {
        id: string;
        properties: {
          [key: string]: {
            [key: string]: any;
          };
        };
    }[];
}

export interface User {
    id?: string;
    avatar?: string;
    fullName?: string;
    email: string;
    password: string;
    company?: string;
    roles: string[];
}

export type UserWithoutPassword = Omit<User, "password">;
