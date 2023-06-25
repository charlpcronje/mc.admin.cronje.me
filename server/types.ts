import { PageI } from "~/notion/types";

export type UserWithoutPassword = Omit<PageI["properties"], "password">;
