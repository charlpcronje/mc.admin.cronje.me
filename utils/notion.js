import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.notionApiKey })

export async function authenticateUser(username, password) {
  const databaseId = process.env.notionUsersDatabaseId
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'Username',
          text: {
            equals: username,
          },
        },
        {
          property: 'Password',
          text: {
            equals: password,
          },
        },
      ],
    },
  })

  return response.results.length > 0
}
