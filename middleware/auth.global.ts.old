// middleware/auth.ts
import { useAuthStore } from '~/store/auth';
import jwt from 'jsonwebtoken';

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore();
    const token = useCookie('token');
    const excludedRoutes = ['/login', '/'];

    // Check if the current route is in the excludedRoutes array
    if (excludedRoutes.includes(to.path) || to.name === 'login' || to.name === 'index') {
        return true
    }

    try {
        // Verify the token
        jwt.verify(token.value!, process.env.SECRET_KEY!);
        auth.authenticated = true;
    } catch (err) {
        // If the token is invalid or expired, set authenticated to false and remove the token
        auth.authenticated = false;
        token.value = null;
    }
    
    if (!auth.authenticated) {
        return navigateTo('/login')
    }
  })