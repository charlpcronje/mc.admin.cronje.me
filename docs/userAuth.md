# User Authentication

## Get Current User

- On any page within the `script setup` block, you can get the current user with the `useAuthUser` function, and no need to import anything.

```ts
const currentUser = useAuthUser();
```

## Protecting a page

- To protect a page, you we use the `definePageMeta({middleware: ["admin-only"]})` function, and no need to import anything.

```ts
// specify who can access this page
definePageMeta({
    middleware: ["admin-only",'manager-only']
});
```

- To protect an API route we can use

```ts
import { getUsers, isAdmin, isManager, isUser,isGuest } from "~/server/models/user";

// isAdmin is a function that returns true if the user is an admin
if (!isAdmin(event.context.user)) {
    return createError({
        statusCode: 401,
        message: "You don't have the rights to access this resource",
    });
}

// isManager is a function that returns true if the user is a manager
if (!isManager(event.context.user)) {
    return createError({
        statusCode: 401,
        message: "You don't have the rights to access this resource",
    });
}

// isUser is a function that returns true if the user is a user
if (!isUser(event.context.user)) {
    return createError({
        statusCode: 401,
        message: "You don't have the rights to access this resource",
    });
}

// isGuest is a function that returns true if the user is a guest
if (!isGuest(event.context.user)) {
    return createError({
        statusCode: 401,
        message: "You don't have the rights to access this resource",
    });
}
```

