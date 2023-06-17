export interface NotionApiResultsResponse {
    // JSON response structure from the Notion API
    // Define only the necessary properties for mapping
    results: NotionApiResponse[]
}

export interface pageProperties { 
    [key: string]: {
        [key: string | number]: any | any[];
    };
}

export interface NotionApiResponse {
    properties: pageProperties;
}

export type UserI = {
    id: number;
    status: boolean;
    avatar?: string;
    fullName?: string;
    emailAddress: string;
    password: string;
    company?: string;
    roles: string[];
}

export interface BotI {
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

export interface CityI {
    id: number;
    cityName: string;
    country?: string;
    population?: number;
    capital?: string;
    adminName?: string;
    lat?: number;
    long?: number;
    shoppingMalls?: string | string[];
}

export interface PageI {
    object?: string;
    id?: string;
    created_time?: Date;
    last_edited_time?: Date;
    created_by?: { 
        object?: 'user';
        id?: string;
    }
    last_edited_by?: { 
        object?: 'user';
        id?: string;
    }
    cover?: string | null;
    icon?: string | null;
    parent?: {
        type?: 'database_id';
        database_id?: string;
    } 
    archived?: boolean;
    properties?: UserI | BotI | CityI | any;
    url?: string;
    public_url?: string | null;
}    

export interface ListI {
    object: 'list';
    results: PageI[];
    next_cursor: string | null;
    has_more: boolean
    type: 'page' | 'list';
    page: {}
}

export type UserWithoutPassword = Omit<PageI["properties"], "password">;
