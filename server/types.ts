import { PageI } from "$notion/interfaces";

export type UserWithoutPassword = Omit<PageI["properties"], "password">;
