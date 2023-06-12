<script lang="ts" setup>
import { capitalize } from '~/utils/str'

// composable
const { t } = useLang()
definePageMeta({
    middleware: ["admin-only"],
});

// compiler macro
definePageMeta({
    layout: 'page',
})
useHead(() => ({
    title: capitalize(t('pages.admin.title')),
    meta: [{
        name: 'description',
        content: t('pages.admin.description'),
    }]
}));

const { data: users } = await useAsyncData("users", () =>
    $fetch("/api/users",{ 
        headers: useRequestHeaders(["cookie"]) as HeadersInit 
    })
);
const currentUser = useAuthUser();
</script>

<template>
    <PageWrapper>
        <PageHeader>
            <PageTitle :text="$t('pages.admin.title')" class="capitalize" />
        </PageHeader>
        <PageBody>
            <PageSection>
                <PageUser :user="currentUser"/>
                <div class="mb-3 text-light-100">
                    <div class="able w-full">
                        <div class="table-header-group font-bold">
                            <div class="able-row">
                                <TableHeaderCell>ID</TableHeaderCell>
                                <TableHeaderCell>Avatar</TableHeaderCell>
                                <TableHeaderCell>Full Name</TableHeaderCell>
                                <TableHeaderCell>Email Address</TableHeaderCell>
                                <TableHeaderCell>Company</TableHeaderCell>
                                <TableHeaderCell>Roles</TableHeaderCell>
                            </div>
                        </div>
                        <div class="table-row-group">
                            <div v-for="user in users" :key="user.id" table-row>
                                <TableBodyCell>{{ user.id }}</TableBodyCell>
                                <TableBodyCell><img style="height:30px" src="{{ user.avatar }}"/></TableBodyCell>
                                <TableBodyCell>{{ user.email }}</TableBodyCell>
                                <TableBodyCell>{{ user.company }}</TableBodyCell>
                                <TableBodyCell>{{ user.roles.join(", ") }}</TableBodyCell>
                            </div>
                        </div>
                    </div>   
                </div>
            </PageSection>
        </PageBody>
    </PageWrapper>
</template>