# Notion Database Reference

## How do I reference a multi select value

how do I reference columns in notion with the notion api especially when the column names have spaces in typescript

To reference columns in Notion with the Notion API, you can use the column properties in the database, which contain the column names as keys. In TypeScript, you can access these properties using dot notation. However, when dealing with column names that have spaces, you'll need to handle them properly.

One approach to handle column names with spaces is to use the `camelCase` or `snake_case` naming convention. This involves converting spaces in the column name to either uppercase letters or underscores, respectively. For example, if you have a column name `Column Name with Space`, you can convert it to `columnNameWithSpace` or `column_name_with_space`.

Here's an example of how to access a column property with a space in its name using TypeScript:

```ts
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

(async () => {
  // Retrieve the database object
  const database = await notion.databases.retrieve(databaseId);

  // Access the column property with a space in its name
  const columnNameWithSpace = database.properties.columnNameWithSpace;

  console.log(`Column Name With Space: ${columnNameWithSpace}`);
})();

```

In this example, replace `columnNameWithSpace` with the actual column name that contains a space.

Keep in mind that when working with the Notion API, you should always handle column names with spaces properly to avoid issues during data retrieval and manipulation.

Sources:

-   [twilio.com](https://www.twilio.com/blog/manipulate-notion-database-using-node-js)
-   [spreadsheetpoint.com](https://spreadsheetpoint.com/how-to-make-columns-in-notion/)

###### Sources

[](https://www.phind.com/filters)

![favicon-notion2sheets.com](https://www.google.com/s2/favicons?domain=notion2sheets.com)notion2sheets.com

[Notion2Sheets - Give Notion the superpowers of Google Sheets](https://notion2sheets.com/)

Keep your databases from Notion automatically in sync with Google Sheets. Use Sheets formulas to send data to Notion and charts to create amazing dashboards!..

[Relations & rollups – Notion Help Center](https://www.notion.so/help/relations-and-rollups)

Have you ever wanted to connect the data between two tables? Youre in luck! Notions relation property is designed to help you express useful relationships..

![favicon-www.notion.so](https://www.google.com/s2/favicons?domain=www.notion.so)www.notion.so > releases > 2022-04-14

[April 14, 2022 – Notion 2.16, now with faster databases](https://www.notion.so/releases/2022-04-14)


## How to access field values in a Notion relation using TypeScript?

To reference field values that are in a relation to another table in Notion using TypeScript, you can follow these steps:

1.  First, create a relation column in the first database by adding a new column, selecting "Relation" as the property type, and specifying the database you want to connect to.

2.  In the second database, you'll see a new relation column added automatically. This column will have an arrow icon indicating that it's a relation column.

3.  To reference a field value from the related table, you can use the `getRelation` function in the Notion API. Here's an example of how to reference a field value from a related table in TypeScript:

```ts
import { Client, Relation, Rollup } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;
const relationId = process.env.NOTION_RELATION_ID;

(async () => {
  // Retrieve the related database object
  const relatedDatabase = await notion.databases.retrieve(relationId);

  // Retrieve the first database object
  const firstDatabase = await notion.databases.retrieve(databaseId);

  // Access the relation column in the first database
  const relationColumn = firstDatabase.properties.columnNameWithSpace;

  // Retrieve the related page ID from the relation column
  const relatedPageId = relationColumn.relation[0].page_id;

  // Retrieve the related page object
  const relatedPage = await notion.pages.retrieve(relatedPageId);

  // Access the related field value
  const relatedFieldValue = relatedPage.properties.relatedFieldName;

  console.log(`Related Field Value: ${relatedFieldValue}`);
})();

```

Replace `columnNameWithSpace`, `relatedFieldName`, `databaseId`, and `relationId` with the appropriate values for your use case.

In this example, we're assuming that the related field name does not have spaces or special characters. If the related field name contains spaces, you may need to handle them properly by using camelCase or another naming convention.
