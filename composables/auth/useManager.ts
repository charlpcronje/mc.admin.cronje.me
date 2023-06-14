export const useManager = () => {
    const authUser = useAuthUser();

    return computed(() => {
        if (!authUser.value) return false;

        return authUser.value.roles.includes("Manager");
    });
};
