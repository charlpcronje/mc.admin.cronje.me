import { User } from "~/models/user";
import cookieSignature from "cookie-signature";
import { useCookieHeader } from "~/server/plugins/useCookieHeader";

const { getCookieHeader } = useCookieHeader();


interface CookieHeader {
    headers: {
      cookie?: string;
    };
}

interface SessionI {
    user: typeof User | null;
    sessionRestored: boolean;
    sessionData?: any;
    setSession(): void;
    serialize(): string;
    deserialize(value: string): SessionI;
    sign(value: string, secret: string): string;
    unsign(value: string, secret: string): string;
    getUserFromSession(): Promise<typeof User | null>;
    loadSession(): SessionI;
}

const Session = (() => {
    let instance: BrowserSession | ServerSession | null = null;
    type sessionInterface = BrowserSession | ServerSession | null;
    class BrowserSession {
        [key: string]: any;
        user: typeof User | null = null;
        sessionRestored: boolean = false;
        sessionData?: any = null;
        
        constructor() {
            if (!instance) {
                instance = this;
            }
            window.addEventListener("beforeunload", () => {
                this.setSession(); // Set the cookie when the page is about to unload
            });
            if (!this.sessionRestored) {
                this.sessionRestored = (this.loadSession()) ? true : false;
            }
            return instance;
        }

        setSession() {
            const name = process.env.COOKIE_NAME!;
            let expires = "";
            const expirationDays = parseInt(process.env.COOKIE_EXPIRES_DAYS!)
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + expirationDays);
            expires = `; expires=${expirationDate.toUTCString()}`;
            const value = sign(this.serialize(),process.env.COOKIE_SECRET!);
            document.cookie = `${name}=${value}${expires}; path=/`;
        }

        serialize() {
            const value = Buffer.from(JSON.stringify(this), "utf-8").toString("base64");
            const length = Buffer.byteLength(value);
            if (length > 4096) throw new Error("Session value is too long");
            return value;
        }

        deserialize(value: string) {
            const deserializedObject = JSON.parse(Buffer.from(value, "base64").toString("utf-8"));
            const emptySession = new BrowserSession();
            instance = Object.assign(emptySession, deserializedObject);
            return instance;
        }

        sign(value: string, secret: string) {
            return cookieSignature.sign(value, secret);
        }

        unsign(value: string, secret: string) {
            return cookieSignature.unsign(value, secret);
        }

        async getUserFromSession() {
            const session = this.loadSession();

            // Check if cookie was found
            if (!session) return null;
            return session?.user;
        }

        loadSession(): sessionInterface {
            const nameEQ = process.env.COOKIE_NAME! + "=";
            const cookieArray = document.cookie.split(";");

            for (let i = 0; i < cookieArray.length; i++) {
                let cookie = cookieArray[i].trim();

                if (cookie.indexOf(nameEQ) === 0) {
                    const cook = cookie.substring(nameEQ.length, cookie.length);
                    const unsignedSession = unsign(cook, process.env.COOKIE_SECRET!);
                    if (!unsignedSession) return null;
                    const session = this.deserialize(unsignedSession);
                    return session;
                }
            }
            return null;
        }

        data(key: any = null, value: any = null, defaultValue: any = null) {
            if (!key && !value && !defaultValue) return this.sessionData;
            if (key && !value && !defaultValue) return this.sessionData[key] || null;
            if (key && value && !defaultValue) return this.sessionData[key] || value;
            if (key && !value && defaultValue) return this.sessionData[key] || defaultValue;
        }
    };

    class ServerSession {
        [key: string]: any;
        user: typeof User | null = null;
        sessionRestored: boolean = false;
        sessionData?: any = null;
        

        constructor() {
            if (!instance) {
                instance = this;
            }
            window.addEventListener("beforeunload", () => {
                this.setSession(); // Set the cookie when the page is about to unload
            });
            if (!this.sessionRestored) {
                this.sessionRestored = (this.loadSession()) ? true : false;
            }
            return instance;
        }

        setSession() {
            const name = process.env.COOKIE_NAME!;
            let expires = "";
            const expirationDays = parseInt(process.env.COOKIE_EXPIRES_DAYS!)
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + expirationDays);
            expires = `; expires=${expirationDate.toUTCString()}`;
            const value = sign(this.serialize(),process.env.COOKIE_SECRET!);
            setCookieHeader(name,value,expires)
        }

        serialize() {
            const value = Buffer.from(JSON.stringify(this), "utf-8").toString("base64");
            const length = Buffer.byteLength(value);
            if (length > 4096) throw new Error("Session value is too long");
            return value;
        }

        deserialize(value: string) {
            const deserializedObject = JSON.parse(Buffer.from(value, "base64").toString("utf-8"));
            const emptySession = new ServerSession();
            instance = Object.assign(emptySession, deserializedObject);
            return instance;
        }

        sign(value: string, secret: string) {
            return cookieSignature.sign(value, secret);
        }

        unsign(value: string, secret: string) {
            return cookieSignature.unsign(value, secret);
        }

        async getUserFromSession() {
            const session = this.loadSession();

            // Check if cookie was found
            if (!session) return null;
            return session?.user;
        }

        loadSession(): BrowserSession | ServerSession | null {
            const cookieHeader: CookieHeader = getCookieHeader();
            const cookieArray = cookieHeader.headers.cookie?.split(';').reduce((cookies: any, cookie: any) => {
                const [name, value] = cookie.split('=').map((part: any) => part.trim());
                cookies[name] = value;
                return cookies;
            }, {});

            const nameEQ = process.env.COOKIE_NAME! + "=";
            
            
            for (let i = 0; i < cookieArray.length; i++) {
                let cookie = cookieArray[i].trim();

                if (cookie.indexOf(nameEQ) === 0) {
                    const cook = cookie.substring(nameEQ.length, cookie.length);
                    const unsignedSession = unsign(cook, process.env.COOKIE_SECRET!);
                    if (!unsignedSession) return null;
                    const session = this.deserialize(unsignedSession);
                    return session;
                    //return cookie.substring(nameEQ.length, cookie.length);
                }
            }

            return null;
        }

        data(key: any = null, value: any = null, defaultValue: any = null) {
            if (!key && !value && !defaultValue) return this.sessionData;
            if (key && !value && !defaultValue) return this.sessionData[key] || null;
            if (key && value && !defaultValue) return this.sessionData[key] || value;
            if (key && !value && defaultValue) return this.sessionData[key] || defaultValue;
        }
    };
    if (process.server) {
        return ServerSession;
    }
    return BrowserSession;
})();

export const session = new Session();