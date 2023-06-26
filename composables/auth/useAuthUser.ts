import type { UserWithoutPassword } from "~/server/types";

export const useAuthUser = () => {
    return useState<UserWithoutPassword | null>("user", () => null);
};
