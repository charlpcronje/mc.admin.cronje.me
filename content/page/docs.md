# Mall Chat Documentation

## Basic description

- This is the admin section for Mall Chat. This is where users can view and launch a Chat Bot for a specific mall. 
- New Shopping Malls can be added in Notion on in the Shopping Malls Database.
- At the moment every shopping mall can only have one Chat Bot, but this will change in the future.
- I plan on creating multiple Chat Bots for each mall. I also then need to create an `mall aggregator` Chat Bot that will be able to search all the bots at a specific mall
- The `mall aggregator` Chat Bot will also be able to search all the malls for a specific shop or brand.
- I will also then create a `city aggregator` and `province aggregator` that will be able to search all the malls in a specific city and province for a specific shop or brand.
- Then finally I will create a `country aggregator` that will be able to search all the malls in South Africa for a specific shop or brand, tell the user about events, news, new shops, etc.

## Manage and add new shopping malls

[Shopping Malls Database](https://www.notion.so/cpcronje/12922c58024f4e9685d0d48517f514a7)

The following fields are required:

- ID (gets generated automatically)
- Mall Name
- Region (Province or State, From Regions Database)
- City (Town, From Cities Database)

The following fields are optional but necessary for the Chat Bot to work:

- Chat Bots (From Chat Bots Database)
- Opening Prompt 
- URL
- Slug
- Poster 
- Mall Icon
- User Icon
- Latitude
- Longitude

## Manage and Add Chat Bots

[Chat Bots Database](https://www.notion.so/cpcronje/80db8da2f07f4cf6960af80106d87bf6)

The following fields are required:

- ID (gets generated automatically)
- Name
- Type (Can be one of 17 types)
- Description

The following fields are optional but necessary for the Chat Bot to work:

- Opening Prompt (This is the first message the user will see when they open the Chat Bot)
- Subject Matter (This is the subject matter of the Chat Bot, e.g. Shopping, Food, Entertainment, etc.)
- Responsibility (This is the responsibility of the Chat Bot, e.g. Mall, Shop, Brand, etc.)
- Shopping Malls (From Shopping Malls Database)

## Manage and Add Regions

[Regions Database](https://www.notion.so/cpcronje/2d88b63bfc46440cb8c899536e872bd8)

The following fields are required:

- ID (gets generated automatically)
- Region

The following fields are optional

- Companies (From Companies Database)
- Shopping Malls (From Shopping Malls Database)
- Cities (From Cities Database)

## Manage and Add Cities

[Cities Database](https://www.notion.so/cpcronje/45c2174d40ae4200986269f4d8917588)

The following fields are required:

- ID (gets generated automatically)
- City

The following fields are optional

- Region (From Regions Database)
- Country (From Countries Database)
- Population 

## Manage and Add Users

[Users Database](https://www.notion.so/cpcronje/024faf40382d4875b11e49f13656ce36)

The following fields are required:

- ID (gets generated automatically)
- Full Name
- Email Address
- Password

The following fields are optional

- Company (From Companies Database)
- Roles (User, Client, Agent, Manager, Admin, Super Admin)

## Table of the chat bots

This table contains a lot of data, it can be viewed by clicking on the link below: 
[Chat Bots Table](./chatBotsTable.md)