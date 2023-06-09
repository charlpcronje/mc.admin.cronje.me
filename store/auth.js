// store/auth.ts
import { defineStore } from 'pinia';
import { useFetch } from '@vueuse/core'
import jwt from 'jsonwebtoken';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        authenticated: false,
        loading: false
    }),
    actions: {
        async authenticateUser(payload) {
            const data = await useFetch('/api/user',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            console.log("Notion Response: ", data);
            // Extract the person's details from the response
            if (data) {
                // Create and sign the token
                const token = jwt.sign({ email: payload.email }, process.env.SECRET_KEY, {
                    expiresIn: '1h',
                });
        
                // Save the token in a cookie
                const tokenCookie = useCookie('token');
                tokenCookie.value = token;
                this.authenticated = true;

                return data;
            } else {    
                return null;
            }
        },
        logUserOut() {
            const token = useCookie('token');
            this.authenticated = false;
            token.value = null;
        }
    }
});