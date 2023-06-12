import type { NotionApiResponse, User } from "~~/types";

export function mapNotionApiResponseToUser(response: NotionApiResponse | NotionApiResponse[]): User | User[] {
  const responses = Array.isArray(response) ? response : [response];
  const users: User[] = [];

  responses.forEach((notionResponse) => {
    notionResponse.results.forEach((userData) => {
      const {
        id,
        properties: {
          'Full Name': { title },
          'Email Address': { email },
          Password: { rich_text },
          Roles: { multi_select },
          Company: { relation },
          Avatar: { files },
        },
      } = userData;

      const fullName = title?.[0]?.plain_text || '';
      const password = rich_text?.[0]?.plain_text || '';
      const roles = multi_select?.map((option: any) => option.name) || [];
      const company = relation?.[0]?.id || '';
      const avatar = files?.[0]?.file?.url || '';

      const user: User = {
        id,
        fullName,
        email,
        password,
        roles,
        company,
        avatar,
      };
      users.push(user);
    });
  });
  if (users.length === 1) return users[0];
  return users
}
