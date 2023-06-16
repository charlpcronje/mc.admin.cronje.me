import { PageI, UserI } from './types';

export class Page implements PageI {
    object: string;
    id: string;
    created_time: Date;
    last_edited_time: Date;
    created_by: { 
        object: 'user';
        id: string;
    }
    last_edited_by: { 
        object: 'user';
        id: string;
    }
    cover?: string | null | undefined;
    icon?: string | null | undefined;
    parent?: {
        type: 'database_id',
        database_id: string 
    }
    archived?: boolean;

    constructor(user: Page) {
        this.object = user.object;
        this.id = user.id;
        this.created_time = user.created_time;
        this.last_edited_time = user.last_edited_time;
        this.created_by = user.created_by;
        this.last_edited_by = user.last_edited_by;
        this.cover = user.cover!;
        this.icon = user.icon!;
        this.parent = user.parent!;
        this.archived = user.archived!;
    }
}

export class User extends Page implements PageI {
    properties: {
        id: number,
        status: boolean,
        avatar: string,
        fullName: string,
        emailAddress: string,
        Password: string,
        Company: string,
        Roles: string[]
    }

    constructor(user: PageI) {
        super(user);
        this.properties = {
            id: user.properties.ID.unique_id.number,
            status: user.properties.Status.checkbox,
            avatar: user.properties.Avatar.files[0].file.url,
            fullName: user.properties.Name.title[0].plain_text,
            emailAddress: user.properties.Email.email.email,
            Password: user.properties.Password.rich_text[0].plain_text,
            Company: user.properties.Company.relation.map((option: any) => option.id)[0],
            Roles: user.properties.Roles.multi_select.map((option: any) => option.name)
        };
    }
}

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
        shoppingMalls: string[]
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
            shoppingMalls: bot.properties['Shopping Malls'].relation.map((option: any) => option.id)
        };
    }
}

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
        shoppingMalls: string[]
    }

    constructor(city: PageI) {
        super(city);
        this.properties = {
            id: city.properties.ID.unique_id.number,
            city: city.properties.City.rich_text[0].plain_text,
            cityAscii: city.properties['City ASCII'].rich_text[0].plain_text,
            region: city.properties.Region.rich_text[0].plain_text,
            adminName: city.properties['Admin Name'].rich_text[0].plain_text,
            capital: city.properties.Capital.rich_text[0].plain_text,
            country: city.properties.Country.rich_text[0].plain_text,
            population: city.properties.Population.number,
            ISO2: city.properties['ISO 2'].rich_text[0].plain_text,
            ISO3: city.properties['ISO 3'].rich_text[0].plain_text,
            lat: city.properties.LAT.number,
            long: city.properties.LONG.number,
            shoppingMalls: city.properties['Shopping Malls'].relation.map((option: any) => option.id)
        };
    }
}