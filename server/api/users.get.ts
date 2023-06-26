import { NotionUser,  } from "~/notion/objects";
import { User, getUsers } from "~/models/user";
import { UserPropertiesI } from "~/notion/types";
import { createPinia, setActivePinia } from "pinia";
const pinia = createPinia();
setActivePinia(pinia);
import { useUserStore } from "~/stores/user";

const {userState} = useUserStore();

export default defineEventHandler(async (event:any) => {
    const user = new User(event.context.user);

    
    if (!userState.value.isAdmin) {
        return createError({
            statusCode: 401,
            message: "You don't have the rights to access this resource",
        });
    }

    const usersWithPassword: NotionUser[] | UserPropertiesI[] = await getUsers();
    const usersWithoutPassword = usersWithPassword.map(user => {
        const { password, ...userWithoutPassword } = user.properties;
        return { ...user, properties: userWithoutPassword };
    });
    return usersWithoutPassword;
});