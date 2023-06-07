const notionApiOptions = {
  baseURL: 'https://api.notion.com/v1',
  headers: {
    Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
    'Notion-Version': '2021-08-16', // Replace with the desired Notion API version
  },
}

export function useNotionDatabase(databaseId) {
  const { data: results = [], loading, error } = useFetch(`/databases/${databaseId}/query`, notionApiOptions)
  const resultss = data.results || []
  return {
    resultss,
    loading,
    error,
  }
}