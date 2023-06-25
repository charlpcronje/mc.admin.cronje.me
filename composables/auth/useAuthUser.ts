import type { UserWithoutPassword } from "/notion/types";

export const useAuthUser = () => {
    return useState<UserWithoutPassword | null>("user", () => null);
};
