# Notion as a CMS

## Overview

Using Notion as a CMS for a website offers several advantages, including user-friendliness, easy collaboration, instant updates, mobile-friendliness, better security, and cost-effectiveness [businesstechweekly.com](https://www.businesstechweekly.com/digital-and-online-marketing/content-marketing/benefits-of-content-management-system/).

Notion's user-friendly interface allows users to easily create and edit content without requiring extensive technical knowledge [businesstechweekly.com](https://www.businesstechweekly.com/digital-and-online-marketing/content-marketing/benefits-of-content-management-system/). The platform enables multiple users to collaborate on content, streamlining the content creation process [businesstechweekly.com](https://www.businesstechweekly.com/digital-and-online-marketing/content-marketing/benefits-of-content-management-system/).

Updating content is quick and easy with Notion, as users can edit and publish changes instantly without relying on a web developer or admin [businesstechweekly.com](https://www.businesstechweekly.com/digital-and-online-marketing/content-marketing/benefits-of-content-management-system/). This ensures that your website content is always up-to-date and relevant.

Notion is designed to be mobile-friendly, making it easy to build websites that look great on mobile devices [businesstechweekly.com](https://www.businesstechweekly.com/digital-and-online-marketing/content-marketing/benefits-of-content-management-system/). Additionally, Notion provides robust security features to protect your website from potential threats [businesstechweekly.com](https://www.businesstechweekly.com/digital-and-online-marketing/content-marketing/benefits-of-content-management-system/).

Cost-effectiveness is another benefit of using Notion as a CMS, as it allows you to make changes to your website without incurring additional expenses for web developers [businesstechweekly.com](https://www.businesstechweekly.com/digital-and-online-marketing/content-marketing/benefits-of-content-management-system/).

In summary, using Notion as a CMS offers a wide range of benefits, including user-friendliness, easy collaboration, instant updates, mobile-friendliness, better security, and cost-effectiveness. These features make it an attractive option for building and managing websites.

## Notion API and SDK

The Notion API allows you to interact with Notion databases, pages, and other content programmatically. It is currently in open beta, which means it is still being actively developed and improved [sitepoint.com](https://www.sitepoint.com/notion-api-javascript-sdk/). The API supports both REST and GraphQL, making it flexible and powerful for developers [dev.to](https://dev.to/craigaholliday/getting-started-with-the-notion-api-javascript-sdk-c50).

To work with the Notion API, you can use the JavaScript SDK, which simplifies the process of interacting with the API. To get started, you need to install the SDK using npm:

```sh
npm install @notionhq/client

```

Then, you can create a Notion client instance with your integration token:

```js
const { Client } = require('@notionhq/client');
const notion = new Client({ auth: 'INTERNAL_INTEGRATION_TOKEN' });

```

[dev.to](https://dev.to/craigaholliday/getting-started-with-the-notion-api-javascript-sdk-c50)

With the SDK, you can easily retrieve, create, update, and delete content in your Notion databases. For example, to retrieve a database object, you can use the following code:

```js
(async () => {
  const databaseId = 'DATABASE_ID';
  const response = await notion.databases.retrieve({ database_id: databaseId });
  console.log(response);
})();

```

[dev.to](https://dev.to/craigaholliday/getting-started-with-the-notion-api-javascript-sdk-c50)

To report issues or request features for the Notion API, you can email [developers@makenotion.com](mailto:developers@makenotion.com) [github.com](https://github.com/makenotion/notion-sdk-js).

The Notion API allows you to create powerful integrations and automations, making it an essential tool for developers who want to leverage the full potential of Notion.

## Databases

**Accessing Notion databases with JavaScript SDK**

Accessing databases in Notion involves working with properties and schemas. Properties are the columns in a database table, and each property has its own type and configuration [developers.notion.com](https://developers.notion.com/docs/working-with-databases). Common property types include text, numbers, dates, and people. Additional configuration options are available for each type, such as formatting and validation [developers.notion.com](https://developers.notion.com/docs/working-with-databases).

Here's an example of a database object with properties:

```js
{
  "object": "database",
  "properties": {
    "Grocery item": {
      "id": "fy:{",
      "type": "title",
      "title": {}
    },
    "Price": {
      "id": "dia[",
      "type": "number",
      "number": {
        "format": "dollar"
      }
    },
    "Last ordered": {
      "id": "]\\R[",
      "type": "date",
      "date": {}
    }
  }
}

```

[developers.notion.com](https://developers.notion.com/docs/working-with-databases)

To insert data into a Notion database, you can create a function that adds a new page with the specified properties. Here's an example of adding a page to a database:

```js
async function addToDatabase(databaseId, username, name, status, date) {
    try {
        const response = await notion.pages.create({
            parent: {
                database_id: databaseId,
            },
            properties: {
                'ID': {
                    type: 'title',
                    title: [
                    {
                        type: 'text',
                        text: {
                            content: username,
                        },
                    },
                    ],
                },
                'Name' : {
                        type: 'rich_text',
                        rich_text: [
                        {
                            type: 'text',
                            text: {
                                content: name,
                            },
                        }
                        ],
                },
                'Status': {
                    type: 'checkbox',
                    checkbox: status
                },
                'Date': { // Date is formatted as YYYY-MM-DD or null
                    type: 'date',
                    date: date
                },
            }    
        });
        console.log(response);
    } catch (error) {
        console.error(error.body);
    }
}

```

[twilio.com](https://www.twilio.com/blog/manipulate-notion-database-using-node-js)

To query a database and retrieve pages based on certain criteria, you can use the `query a database` endpoint. This allows you to filter results by property values, such as retrieving pages where the "Last ordered" date is in the past week. You can also control the order of results and fetch them in smaller batches [developers.notion.com](https://developers.notion.com/docs/working-with-databases).

In summary, accessing databases in Notion involves working with properties and schemas, allowing you to store and manage different types of data. You can insert data into a database using the JavaScript SDK and query databases to retrieve pages based on specific criteria.
