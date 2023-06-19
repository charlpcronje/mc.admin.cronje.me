import { PageI, UserPropertiesI, BotPropertiesI, CityPropertiesI, CompanyPropertiesI, MallPropertiesI, RegionPropertiesI } from '$serverInterfaces/notion';

export function notion() {
    const Page = class implements PageI {
        [prop: string]: any;
    
        constructor(page: PageI) {
            if (isDev())  {
                console.log(`%cInstantiating ${this.constructor.name}`, 'color: green; font-weight: bold;');
            }
            Object.assign(this, page);
        }
    
        logProps(instanceMsg:any | null = null) {
            if (isDev()) { 
                if (instanceMsg)  {
                    console.log(`%c${instanceMsg}, 'color: lightgreen'`);
                }
            
                console.table(`%c${this.properties}, 'color: lightgreen'`);

                /*
                Object.keys(this).forEach(prop => {
                    console.log(`%c${prop}: ${this.prop}`, 'color: lightgreen');
                });*/

                console.log(`%cInstantiated ${this.constructor.name}`, 'color: green; font-weight: bold;');
            }
        }
    }


    // Sample data for Bot that extends Page: <a href="~/docs/data/bot.json" target="_blank">bot.json</a>
    const Bot = class extends Page implements PageI {
        properties: BotPropertiesI;

        constructor(bot: PageI,instanceMsg: string | null) {
            super(bot);
            const props = bot.properties!;
            this.properties = {
                id: props.ID.unique_id.number,
                status: props.Status.checkbox,
                avatar: props.Avatar.files[0].file.url,
                name: props.Name.title[0].plain_text,
                type: props.Type.select.name,
                description: props.Description.rich_text[0].plain_text,
                openingPrompt: props['Opening Prompt'].rich_text[0].plain_text,
                subjectMatter: props['Subject Matter'].rich_text[0].plain_text,
                responsibility: props.Responsibility.rich_text[0].plain_text,
                shoppingMalls: props.shoppingMalls.formula.string,

                // Relations
                shoppingMallsRelation: props['Shopping Malls'].relation.map((option: any) => option.id)
            };
            this.logProps(instanceMsg);
        }
    }

    // Sample data for City that extends Page: <a href="~/docs/data/city.json" target="_blank">city.json</a>
    const City = class extends Page implements PageI {
        properties: CityPropertiesI;

        constructor(city: PageI,instanceMsg: string | null) {
            super(city);
            const props = city.properties!;
            this.properties = {
                id: props.ID.unique_id.number,
                city: props.City.rich_text[0].plain_text,
                cityAscii: props['City ASCII'].rich_text[0].plain_text,
                region: props.Region.formula.string,
                adminName: props['Admin Name'].rich_text[0].plain_text,
                capital: props.Capital.rich_text[0].plain_text,
                country: props.Country.rich_text[0].plain_text,
                population: props.Population.number,
                ISO2: props['ISO 2'].rich_text[0].plain_text,
                ISO3: props['ISO 3'].rich_text[0].plain_text,
                lat: props.LAT.number,
                long: props.LONG.number,
                shoppingMalls: props.shoppingMalls.formula.string,

                // Relations
                regionRelation: props['Shopping Malls'].relation[0].id,
                shoppingMallsRelation: props['Shopping Malls'].relation.map((option: any) => option.id)
            };
            this.logProps(instanceMsg);
        }
    }

    // Sample data for Company that extends Page: <a href="~/docs/data/company.json" target="_blank">company.json</a>
    const Company = class extends Page implements PageI {
        properties: CompanyPropertiesI;

        constructor(company: PageI,instanceMsg: string | null) {
            super(company);
            const props = company.properties!;
            this.properties = {
                id: props.ID.unique_id.number,
                logo: props.Logo.files[0].file.url,
                companyName: props['Company Name'].title[0].plain_text,
                contactNumber: props['Contact Number'].phone_number,
                emailAddress: props['Email Address'].email,
                province: props.province.formula.string,
                contactPerson: props['Contact Person'].rich_text[0].plain_text,
                users: props.users.formula.string,

                // Relations
                provinceRelation: props.Province.relation[0].id,
                usersRelation: props.Users.relation.map((option: any) => option.id)
            };
            this.logProps(instanceMsg);
        }
    }

    // Sample data for Region that extends Page: <a href="~/docs/data/region.json" target="_blank">region.json</a>
    const Region = class extends Page implements PageI {
        properties: RegionPropertiesI;

        constructor(region: PageI,instanceMsg: string | null) {
            super(region);
            const props = region.properties!;
            this.properties = {
                id: props.ID.unique_id.number,
                region: props.Region.title[0].plain_text,
                shoppingMalls: props['shoppingMalls'].formula.string,
                companies: props['Companies Value'].formula.string,
                cities: props.cities.formula.string,

                // Relations
                shoppingMallsRelation: props['Shopping Malls'].relation.map((option: any) => option.id),
                companiesRelation: props.Companies.relation.map((option: any) => option.id),
                citiesRelation: props.Cities.relation.map((option: any) => option.id),
            };
            this.logProps(instanceMsg);
        }
    }

    /**
     * Sample database data for Mall that extends Page: <a href="~/docs/data/mall.json" target="_blank">mall.json</a>
     * Sample content data for Mall that extends Page: <a href="~/docs/data/gardenRouteMall.md" target="_blank">gardenRouteMall.md</a> and <a href="~/docs/data/menlynParkMall.md" target="_blank">menlynParkMall</a>
     * */
    const Mall = class extends Page implements PageI {
        properties: MallPropertiesI;

        constructor(mall: PageI,instanceMsg: string | null) {
            super(mall);
            const props = mall.properties!;
            this.properties = {
                id: props.ID.unique_id.number,
                poster: props.Poster.files[0].file.url,
                mallName: props['Mall Name'].title[0].plain_text,
                demoData: props.Poster.files[0].file.url,
                openingPrompt: props['Opening Prompt'].rich_text[0].plain_text,
                url: props.URL.rich_text[0].plain_text,
                slug: props.Slug.rich_text[0].plain_text,
                mallIcon: props['Mall Icon'].files[0].file.url,
                userIcon: props['User Icon'].files[0].file.url,
                lat: props.Latitude.number,
                Long: props.Longitude.number,
                region: props.Region.formula.string,
                city: props.City.formula.string,

                // Relations
                chatBotsRelation: props['Chat Bots'].relation.map((option: any) => option.id),
                regionRelation: props.Region.relation[0].name,
                cityRelation: props.City.relation[0].name
            };
            this.logProps(instanceMsg);
        }
    }

    // Sample data for User that extends Page: <a href="~/docs/data/user.json" target="_blank">user.json</a>
    const User = class extends Page implements PageI {
        properties: UserPropertiesI;
        
        constructor(user: PageI,instanceMsg: string | null) {
            super(user);
            const props = user.properties!;
            console.log("PROPS",props);
            this.properties = {
                id: props.ID.unique_id.number,
                status: props.Status.checkbox,
                avatar: (props.Avatar.files[0].file) ? props.Avatar.files[0].file.url : '',
                fullName: props['Full Name'].title[0].plain_text,
                emailAddress: props['Email Address'].email,
                password: props.Password.rich_text[0].plain_text,
                roles: props.Roles.multi_select.map((option: any) => option.name),
                company: props.company.formula.string,

                // Relations
                companyRelation: props.Company.relation.map((option: any) => option.id)[0],
            };

            this.logProps(instanceMsg);
        }
    }

    
    return {
        Page :    (page:PageI)                            => new Page(page),
        City :    (city:PageI,instanceMsg: any | null)    => new City(city,instanceMsg),
        Company : (company:PageI,instanceMsg: any | null) => new Company(company,instanceMsg),
        Region :  (region:PageI,instanceMsg: any | null)  => new Region(region,instanceMsg),
        Mall :    (mall:PageI,instanceMsg: any | null)    => new Mall(mall,instanceMsg),
        User :    (user:PageI,instanceMsg: any | null)    => new User(user,instanceMsg)
    };
}