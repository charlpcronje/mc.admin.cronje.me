import type { NotionApiResponse,NotionApiResultsResponse, User } from "~~/types";

export function mapNotionApiResponseToUser(response: NotionApiResponse[] | NotionApiResultsResponse): User[] {
  if ('results' in response) {
    response = response.results;
  }
  const users: User[] = [];
  response.forEach((notionResponse) => {
      const {
        properties: {
           ID:             { unique_id },
           Status:         { checkbox },
          'Full Name':     { title },
          'Email Address': { email },
          Password:        { rich_text },
          Roles:           { multi_select },
          Company:         { relation },
          Avatar:          { files },
        },
      } = notionResponse;
      
      const id       = unique_id?.number || '';
      const status   = checkbox || false;
      const fullName = title?.[0]?.plain_text || '';
      const password = rich_text?.[0]?.plain_text || '';
      const roles    = multi_select?.map((option: any) => option.name) || [];
      const company  = relation?.[0]?.id || '';
      const avatar   = files?.[0]?.file?.url || '';

      const user: User = {
        id,
        status,
        fullName,
        email,
        password,
        roles,
        company,
        avatar,
      };
      users.push(user);
  });
  return users
}
