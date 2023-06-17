import { PageI } from '../server/utils/types';

/**
 * This is the base class for all Notion objects.
 */
export class Page implements PageI {
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
    cover?: string | null | undefined;
    icon?: string | null | undefined;
    parent?: {
        type?: 'database_id',
        database_id?: string 
    }
    archived?: boolean;

    constructor(page: Page) {
        Object.assign(this, page);
    }
}

// Sample data for User that extends Page: <a href="~/docs/data/user.json" target="_blank">user.json</a>
export class User extends Page implements PageI {
    properties: {
        id: number,
        status: boolean,
        avatar: string,
        fullName: string,
        emailAddress: string,
        password: string,
        company: string,
        roles: string[]

        // Relations
        companyRelation: string,
        
    }

    constructor(user: PageI) {
        super(user);
        this.properties = {
            id: user.properties.ID.unique_id.number,
            status: user.properties.Status.checkbox,
            avatar: user.properties.Avatar.files[0].file.url,
            fullName: user.properties['Full Name'].title[0].plain_text,
            emailAddress: user.properties['Email Address'].email,
            password: user.properties.Password.rich_text[0].plain_text,
            roles: user.properties.Roles.multi_select.map((option: any) => option.name),
            company: user.properties.company.formula.string,
            
            // Relations
            companyRelation: user.properties.Company.relation.map((option: any) => option.id)[0],
        };
    }
}

// Sample data for Bot that extends Page: <a href="~/docs/data/bot.json" target="_blank">bot.json</a>
export class Bot extends Page implements PageI {
    properties: {
        id: number,
        status: boolean,
        avatar: string,
        name: string,
        type: string,
        description: string,
        openingPrompt: string,
        subjectMatter: string,
        responsibility: string,
        shoppingMalls: string,

        // Relations
        shoppingMallsRelation: string[]
    }

    constructor(bot: PageI) {
        super(bot);
        this.properties = {
            id: bot.properties.ID.unique_id.number,
            status: bot.properties.Status.checkbox,
            avatar: bot.properties.Avatar.files[0].file.url,
            name: bot.properties.Name.title[0].plain_text,
            type: bot.properties.Type.select.name,
            description: bot.properties.Description.rich_text[0].plain_text,
            openingPrompt: bot.properties['Opening Prompt'].rich_text[0].plain_text,
            subjectMatter: bot.properties['Subject Matter'].rich_text[0].plain_text,
            responsibility: bot.properties.Responsibility.rich_text[0].plain_text,
            shoppingMalls: bot.properties.shoppingMalls.formula.string,

            // Relations
            shoppingMallsRelation: bot.properties['Shopping Malls'].relation.map((option: any) => option.id)
        };
    }
}

// Sample data for City that extends Page: <a href="~/docs/data/city.json" target="_blank">city.json</a>
export class City extends Page implements PageI {
    properties: {
        id: number,
        city: string,
        cityAscii: string,
        region: string,
        adminName: string,
        capital: string,
        country: string,
        population: string,
        ISO2: string,
        ISO3: string,
        lat: number,
        long: number,
        shoppingMalls: string,

        // Relations
        regionRelation: string,
        shoppingMallsRelation: string[]
    }

    constructor(city: PageI) {
        super(city);
        this.properties = {
            id: city.properties.ID.unique_id.number,
            city: city.properties.City.rich_text[0].plain_text,
            cityAscii: city.properties['City ASCII'].rich_text[0].plain_text,
            region: city.properties.Region.formula.string,
            adminName: city.properties['Admin Name'].rich_text[0].plain_text,
            capital: city.properties.Capital.rich_text[0].plain_text,
            country: city.properties.Country.rich_text[0].plain_text,
            population: city.properties.Population.number,
            ISO2: city.properties['ISO 2'].rich_text[0].plain_text,
            ISO3: city.properties['ISO 3'].rich_text[0].plain_text,
            lat: city.properties.LAT.number,
            long: city.properties.LONG.number,
            shoppingMalls: city.properties.shoppingMalls.formula.string,
            
            // Relations
            regionRelation: city.properties['Shopping Malls'].relation[0].id,
            shoppingMallsRelation: city.properties['Shopping Malls'].relation.map((option: any) => option.id)
        };
    }
}

// Sample data for Company that extends Page: <a href="~/docs/data/company.json" target="_blank">company.json</a>
export class Company extends Page implements PageI {
    properties: {
        id: number,
        logo: string,
        companyName: string,
        contactNumber: string,
        emailAddress: string,
        province: string,
        contactPerson: string,
        users: string,

        // Relations
        provinceRelation: string,
        usersRelation: string[]
    }

    constructor(company: PageI) {
        super(company);
        this.properties = {
            id: company.properties.ID.unique_id.number,
            logo: company.properties.Logo.files[0].file.url,
            companyName: company.properties['Company Name'].title[0].plain_text,
            contactNumber: company.properties['Contact Number'].phone_number,
            emailAddress: company.properties['Email Address'].email,
            province: company.properties.province.formula.string,
            contactPerson: company.properties['Contact Person'].rich_text[0].plain_text,
            users: company.properties.users.formula.string,

            // Relations
            provinceRelation: company.properties.Province.relation[0].id,
            usersRelation: company.properties.Users.relation.map((option: any) => option.id)
        };
    }
}

// Sample data for Region that extends Page: <a href="~/docs/data/region.json" target="_blank">region.json</a>
export class Region extends Page implements PageI {
    properties: {
        id: number,
        region: string,
        shoppingMalls: string,
        companies: string,
        cities: string,

        // Relations
        shoppingMallsRelation: string[],
        companiesRelation: string[],
        citiesRelation: string[]
    }

    constructor(region: PageI) {
        super(region);
        this.properties = {
            id: region.properties.ID.unique_id.number,
            region: region.properties.Region.title[0].plain_text,
            shoppingMalls: region.properties['shoppingMalls'].formula.string,
            companies: region.properties['Companies Value'].formula.string,
            cities: region.properties.cities.formula.string,

            // Relations
            shoppingMallsRelation: region.properties['Shopping Malls'].relation.map((option: any) => option.id),
            companiesRelation: region.properties.Companies.relation.map((option: any) => option.id),
            citiesRelation: region.properties.Cities.relation.map((option: any) => option.id),
        };
    }
}


  
/**
 * Sample database data for Mall that extends Page: <a href="~/docs/data/mall.json" target="_blank">mall.json</a>
 * Sample content data for Mall that extends Page: <a href="~/docs/data/gardenRouteMall.md" target="_blank">gardenRouteMall.md</a> and <a href="~/docs/data/menlynParkMall.md" target="_blank">menlynParkMall</a>
 * */ 
export class Mall extends Page implements PageI {
    properties: {
        id: number,
        poster: string,
        mallName: string,
        demoData: string,
        openingPrompt: string,
        url: string,
        slug: string,
        mallIcon: string,
        userIcon: string,
        lat: string,
        Long: string,
        region: string,
        city: string,

        // Relations
        chatBotsRelation: string[],
        regionRelation: string,
        cityRelation: string
    }

    constructor(mall: PageI) {
        super(mall);
        this.properties = {
            id: mall.properties.ID.unique_id.number,
            poster: mall.properties.Poster.files[0].file.url,
            mallName: mall.properties['Mall Name'].title[0].plain_text,
            demoData: mall.properties.Poster.files[0].file.url,
            openingPrompt: mall.properties['Opening Prompt'].rich_text[0].plain_text,
            url: mall.properties.URL.rich_text[0].plain_text,
            slug: mall.properties.Slug.rich_text[0].plain_text,
            mallIcon: mall.properties['Mall Icon'].files[0].file.url,
            userIcon: mall.properties['User Icon'].files[0].file.url,
            lat: mall.properties.Latitude.number,
            Long: mall.properties.Longitude.number,
            region: mall.properties.Region.formula.string,
            city: mall.properties.City.formula.string,

            // Relations
            chatBotsRelation: mall.properties['Chat Bots'].relation.map((option: any) => option.id),
            regionRelation: mall.properties.Region.relation[0].name,
            cityRelation: mall.properties.City.relation[0].name
        };
    }
}



