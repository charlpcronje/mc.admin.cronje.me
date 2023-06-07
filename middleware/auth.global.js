import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

// what does th next line of code do?
const publicKey = fs.readFileSync(path.join(__dirname, '../public/public.key'));

export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === '/login' || to.path === '/register') {
        return;
    }

    const headers = useRequestHeaders()
    const token = headers.authorization;

    try {
        const decoded = jwt.verify(token, publicKey);
        req.user = decoded;
    } catch (error) {
        navigateTo('/login');
    }
});