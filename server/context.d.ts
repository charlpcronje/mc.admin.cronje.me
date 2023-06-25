import { User } from "~/models/user";

declare module "h3" {
    interface H3EventContext {
        user?: User
    }
}

export {};
