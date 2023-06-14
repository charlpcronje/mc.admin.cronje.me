import type { NotionApiResultsResponse, NotionApiResponse, Bot } from "~~/types";

export function mapNotionApiResponseToBot(response: NotionApiResponse[]): Bot[] {
  if (response.results) {
    response = response.results;
  }
  
  const bots: Bot[] = [];
  response.forEach((notionResponse) => {
      const {
        properties: {
          ID:               { unique_id },
          Status:           { checkbox },
          Avatar:           { files },
          Type:             { multi_select },
          Name:             { title },
          Description:      { desc_rich_text },
          'Opening Prompt': { open_rich_text },
          'Subject Matter': { sub_rich_text },
          Responsibility:   { resp_rich_text },
          'Shopping Malls': { relation },
        },
      } = notionResponse;
      
      const id =             unique_id?.number || '';      
      const status =         checkbox || false;
      const avatar =         files?.[0]?.file?.url || '';
      const type =           multi_select?.map((option: any) => option.name) || [];
      const name =           title?.[0]?.plain_text || '';
      const description =    desc_rich_text?.[0]?.plain_text || '';
      const openingPrompt =  open_rich_text?.[0]?.plain_text || '';
      const subjectMatter =  sub_rich_text?.[0]?.plain_text || '';
      const Responsibility = resp_rich_text?.[0]?.plain_text || '';
      const ShoppingMalls =  [relation?.[0]?.id || ''];

      const bot: Bot = {
        id,
        status,
        avatar,
        type,
        name,
        description,
        openingPrompt,
        subjectMatter,
        Responsibility,
        ShoppingMalls
      };
      bots.push(bot);
  });
  return bots
}
