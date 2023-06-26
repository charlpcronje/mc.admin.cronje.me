export interface ResponseI {
    object: 'list';
    results: PageI[];
    next_cursor: string | null;
    has_more: boolean;
    type: 'list' | 'page' | 'database' | 'workspace' | 'user' | 'block' | 'collection_view' | 'collection' | 'notion_user' | 'space' | 'space_view' | 'comment' | 'discussion' | 'discussion_comment' | 'block' | 'list' | 'to_do' | 'heading' | 'paragraph' | 'bulleted_list_item' | 'numbered_list_item' | 'toggle' | 'code' | 'bookmark' | 'image' | 'video' | 'file' | 'audio' | 'pdf' | 'equation' | 'factory' | 'table_of_contents' | 'breadcrum';
    [key: string]: any;
}

export type role = "Admin" | "Agent" | "Client" | "Manager";

export interface NotionQueryDatabaseResponse {
    [key: string]: any | any[];
}



export interface pagePropertiesI {
    [key: string]: any;
}

export interface CompanyPropertiesI extends pagePropertiesI {
    id: number;
    logo: string;
    companyName: string;
    contactNumber: string;
    emailAddress: string;
    province: string;
    contactPerson: string;
    users: string;

    // Relations
    provinceRelation: string;
    usersRelation: string[]
}

export interface UserPropertiesI extends pagePropertiesI {
    id: number;
    status: boolean;
    avatar?: string;
    fullName: string;
    emailAddress: string;
    password: string;
    company?: string;
    roles?: role[];

    // Relations
    companyRelation?: string;
}

export interface BotPropertiesI extends pagePropertiesI {
    id: number;
    status: boolean;
    avatar: string;
    name: string;
    type: string;
    description: string;
    openingPrompt: string;
    subjectMatter: string;
    responsibility: string;
    shoppingMalls: string;

    // Relations
    shoppingMallsRelation: string[]
}

export interface CityPropertiesI extends pagePropertiesI {
    city: string;
    cityAscii: string;
    region: string;
    adminName: string;
    capital: string;
    country: string;
    population: string;
    ISO2: string;
    ISO3: string;
    lat: number;
    long: number;
    shoppingMalls: string;

    // Relations
    regionRelation: string;
    shoppingMallsRelation: string[]
}

export interface RegionPropertiesI extends pagePropertiesI {
    id: number;
    region: string;
    shoppingMalls: string;
    companies: string;
    cities: string;

    // Relations
    shoppingMallsRelation: string[];
    companiesRelation: string[];
    citiesRelation: string[]
}

export interface MallPropertiesI extends pagePropertiesI {
    id: number;
    poster: string;
    mallName: string;
    demoData: string;
    openingPrompt: string;
    url: string;
    slug: string;
    mallIcon: string;
    userIcon: string;
    lat: string;
    Long: string;
    region: string;
    city: string;

    // Relations
    chatBotsRelation: string[];
    regionRelation: string;
    cityRelation: string
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
    properties?: UserPropertiesI | BotPropertiesI | CityPropertiesI | CompanyPropertiesI | RegionPropertiesI | MallPropertiesI | any;
    url?: string;
    public_url?: string | null;
    logProps?(): void;
    [key: string]: any | Function;
}  

export type UserWithoutPassword = Omit<PageI["properties"], "password">;