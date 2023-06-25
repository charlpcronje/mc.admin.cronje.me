import { defineStore } from 'pinia'
import { User } from '~/models/user'
import { UserPropertiesI } from '~/notion/types';
import { session } from '~/utils/Session';
interface Credentials {
    email: string
    password: string
    rememberMe: boolean
}

export const useUserStore = defineStore('user', {
    state: () => ({
        signedInUser: null as UserPropertiesI | null,
    }),
    actions: {
        onCreate() {
            // Run initialization code here

            console.log('User store created');
            session.init();
        },
        async signIn(user: Credentials) {
            Object.assign(user, {rememberMe: false})
            const data:any = await $fetch("/auth/login", {
                method: "POST",
                body: {
                    email: user.email,
                    password: user.password,
                    rememberMe: user.rememberMe
                },
            });
            console.log(data);
            this.signedInUser = new User(data)
        },
        async signOut() {
            const data:any = await $fetch("/auth/logout", {
                method: "POST",
                body: {
                    id: this.signedInUser?.id
                },
            });
            this.signedInUser = null
        },
    }
})
