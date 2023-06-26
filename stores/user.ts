import { createPinia, setActivePinia } from "pinia";
const pinia = createPinia();
setActivePinia(pinia);
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { User } from '~/models/user'
import { useLocalStorage } from '@vueuse/core';
import { UserPropertiesI } from '~/notion/types';
interface Credentials {
    email: string
    password: string
    rememberMe: boolean
}
export const useUserStore = defineStore('user', (): {
    userState: Ref<UserPropertiesI>;
    signIn: (formData: Credentials) => Promise<any>;
    signOut: () => Promise<any>;
} => {
    const userState = ref(
        useLocalStorage("mallChatUser", {} as UserPropertiesI, { 
            listenToStorageChanges: true,
            deep: true,
        })
    );

    const signIn = async(formData: Credentials) {
        const data:any = await $fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        if (data.success) {
            userState.value = new User(data.user)
        }
        return data
    }
     
    const signOut = async() {
        const data:any = await $fetch("/auth/logout", {
            method: "POST"
        })
        if (data.success) {
            userState.value = null;
        }
        return data;
    }

    return {
        userState,
        signIn,
        signOut
    }
});
