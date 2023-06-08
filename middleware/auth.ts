// middleware/auth.ts
import { useAuthStore } from '~/store/auth';
import jwt from 'jsonwebtoken';
const config = useRuntimeConfig();
import { useRouter } from 'vue-router';

export const useAuthMiddleware = () => {
    const auth = useAuthStore();
    const router = useRouter();
    const token = useCookie('token');
    const excludedRoutes = ['/login', '/'];

    // Check if the current route is in the excludedRoutes array
    if (excludedRoutes.includes(router.currentRoute.value.path)) {
        return;
    }

    try {
        // Verify the token
        jwt.verify(token.value!, config.secretKey);
        auth.authenticated = true;
    } catch (err) {
        // If the token is invalid or expired, set authenticated to false and remove the token
        auth.authenticated = false;
        token.value = null;
    }

    if (!auth.authenticated) {
        router.push('/login');
    }
};
