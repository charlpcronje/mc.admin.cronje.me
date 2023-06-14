export const useGuest = () => {
    const authUser = useAuthUser();

    return computed(() => {
        if (!authUser.value) return false;

        const rolesToCheck = ['Admin', 'Manager', 'User', 'Agent'];
        const hasRoles = rolesToCheck.every(role => authUser.value!.roles);
        return !hasRoles;
    });
};
