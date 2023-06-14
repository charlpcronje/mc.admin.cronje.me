export interface NotionApiResponse {
    // JSON response structure from the Notion API
    // Define only the necessary properties for mapping
    id: string;
    properties: {
        [key: string]: {
            [key: string]: any;
        };
    };
}

export interface NotionApiResultsResponse {
    // JSON response structure from the Notion API
    // Define only the necessary properties for mapping
    results: NotionApiResponse[]
}

export interface User {
    id: number;
    status: boolean;
    avatar?: string;
    fullName?: string;
    email: string;
    password: string;
    company?: string;
    roles: string[];
}


export interface Bot {
    id: number;
    status: boolean;
    avatar?: string;
    type?: string;
    name: string;
    description?: string;
    openingPrompt?: string;
    subjectMatter?: string;
    Responsibility?: string;
    ShoppingMalls?: string | string[]
}

export interface City {
    id: number;
    city: string;
    country?: string;
    population?: number;
    capital?: string;
    adminName?: string;
    lat?: number;
    long?: number;
    shoppingMalls?: string | string[];
}

export type UserWithoutPassword = Omit<User, "password">;
