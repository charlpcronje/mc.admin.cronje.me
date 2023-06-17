import type { PageI, ListI } from "~~/types";
import { User } from "~~/objects";

export function mapNotionToUser(response: PageI[] | ListI): User[] {
  if ('results' in response) {
    response = response.results;
  }
  console.log("Map Users",{response});
  const users: User[] = [];
  response.forEach((page) => {
    users.push(new User(page));
  });
  return users;
}