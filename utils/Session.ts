import { User } from "~/models/user";
import cookieSignature from "cookie-signature";



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

export const Session = (() => {
    let instance: BrowserSession | ServerSession | null = null;
    type sessionInterface = BrowserSession | ServerSession | null;
    class BrowserSession {
        [key: string]: any;
        static user: typeof User | null = null;
        static sessionRestored: boolean = false;
        static sessionData?: any = null;
        
        constructor() {
            if (!instance) {
                instance = this;
            }
            if (!BrowserSession.sessionRestored) {
                BrowserSession.sessionRestored = (BrowserSession.loadSession()) ? true : false;
            }
            return instance;
        }

        static setSession() {
            const name = process.env.COOKIE_NAME!;
            let expires = "";
            const expirationDays = parseInt(process.env.COOKIE_EXPIRES_DAYS!)
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + expirationDays);
            expires = `; expires=${expirationDate.toUTCString()}`;
            const value = BrowserSession.sign(BrowserSession.serialize(),process.env.COOKIE_SECRET!);
            //document.cookie = `${name}=${value}${expires}; path=/`;
        }

        static serialize() {
            const value = Buffer.from(JSON.stringify(BrowserSession), "utf-8").toString("base64");
            const length = Buffer.byteLength(value);
            if (length > 4096) throw new Error("Session value is too long");
            return value;
        }

        static deserialize(value: string) {
            const deserializedObject = JSON.parse(Buffer.from(value, "base64").toString("utf-8"));
            const emptySession = new BrowserSession();
            instance = Object.assign(emptySession, deserializedObject);
            return instance;
        }

        static sign(value: string, secret: string) {
            return cookieSignature.sign(value, secret);
        }

        static unsign(value: string, secret: string) {
            return cookieSignature.unsign(value, secret);
        }

        static async getUserFromSession() {
            const session = BrowserSession.loadSession();

            // Check if cookie was found
            if (!session) return null;
            return session?.user;
        }

        static loadSession(): sessionInterface {
            const nameEQ = process.env.COOKIE_NAME! + "=";
            const cookieArray = document.cookie.split(";");

            for (let i = 0; i < cookieArray.length; i++) {
                let cookie = cookieArray[i].trim();

                if (cookie.indexOf(nameEQ) === 0) {
                    const cook = cookie.substring(nameEQ.length, cookie.length);
                    const unsignedSession = BrowserSession.unsign(cook, process.env.COOKIE_SECRET!);
                    if (!unsignedSession) return null;
                    const session = BrowserSession.deserialize(unsignedSession);
                    return session;
                }
            }
            return null;
        }

        static data(key: any = null, value: any = null, defaultValue: any = null) {
            if (!key && !value && !defaultValue) return BrowserSession.sessionData;
            if (key && !value && !defaultValue) return BrowserSession.sessionData[key] || null;
            if (key && value && !defaultValue) return BrowserSession.sessionData[key] || value;
            if (key && !value && defaultValue) return BrowserSession.sessionData[key] || defaultValue;
        }
    };

    class ServerSession {
        [key: string]: any;
        static user: typeof User | null = null;
        static sessionRestored: boolean = false;
        static sessionData?: any = null;
        

        constructor() {
            if (!instance) {
                instance = this;
            }
            if (!ServerSession.sessionRestored) {
                ServerSession.sessionRestored = (ServerSession.loadSession()) ? true : false;
            }
            return instance;
        }

        static setSession() {
            const name = process.env.COOKIE_NAME!;
            let expires = "";
            const expirationDays = parseInt(process.env.COOKIE_EXPIRES_DAYS!)
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + expirationDays);
            expires = `; expires=${expirationDate.toUTCString()}`;
            const value = ServerSession.sign(ServerSession.serialize(),process.env.COOKIE_SECRET!);
            document.cookie = `${name}=${value}${expires}; path=/`;
        }

        static serialize() {
            const value = Buffer.from(JSON.stringify(ServerSession), "utf-8").toString("base64");
            const length = Buffer.byteLength(value);
            if (length > 4096) throw new Error("Session value is too long");
            return value;
        }

        static deserialize(value: string) {
            const deserializedObject = JSON.parse(Buffer.from(value, "base64").toString("utf-8"));
            const emptySession = new ServerSession();
            instance = Object.assign(emptySession, deserializedObject);
            return instance;
        }

        static sign(value: string, secret: string) {
            return cookieSignature.sign(value, secret);
        }

        static unsign(value: string, secret: string) {
            return cookieSignature.unsign(value, secret);
        }

        static async getUserFromSession() {
            if (process.server) return null;
            const session = ServerSession.loadSession();

            // Check if cookie was found
            if (!session) return null;
            return session?.user;
        }

        static loadSession(): BrowserSession | ServerSession | null {
            // const cookieHeader: CookieHeader = process.server ? (process as any).$nuxt.$cookies : null;
            // const cookieArray = cookieHeader.headers.cookie?.split(';').reduce((cookies: any, cookie: any) => {
            //     const [name, value] = cookie.split('=').map((part: any) => part.trim());
            //     cookies[name] = value;
            //     return cookies;
            // }, {});

            // const nameEQ = process.env.COOKIE_NAME! + "=";
            
            
            // for (let i = 0; i < cookieArray.length; i++) {
            //     let cookie = cookieArray[i].trim();

            //     if (cookie.indexOf(nameEQ) === 0) {
            //         const cook = cookie.substring(nameEQ.length, cookie.length);
            //         const unsignedSession = ServerSession.unsign(cook, process.env.COOKIE_SECRET!);
            //         if (!unsignedSession) return null;
            //         const session = ServerSession.deserialize(unsignedSession);
            //         return session;
            //         //return cookie.substring(nameEQ.length, cookie.length);
            //     }
            // }

            // return null;
        }

        static data(key: any = null, value: any = null, defaultValue: any = null) {
            if (!key && !value && !defaultValue) return ServerSession.sessionData;
            if (key && !value && !defaultValue) return ServerSession.sessionData[key] || null;
            if (key && value && !defaultValue) return ServerSession.sessionData[key] || value;
            if (key && !value && defaultValue) return ServerSession.sessionData[key] || defaultValue;
        }
    };
    if (process.server) {
        return ServerSession;
    }
    return BrowserSession;
})();

export const session = new Session();