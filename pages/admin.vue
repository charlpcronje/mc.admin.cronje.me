<script lang="ts" setup>
import { capitalize } from '~/utils/str'

// composable
const { t } = useLang()
definePageMeta({
    middleware: ["admin-only"],
});

// compiler macro
definePageMeta({
    layout: 'dashboard',
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
            <PageTitle :text="$t('pages.admin.title')+':'+' '+currentUser.fullName" class="capitalize" />
        </PageHeader>
        <PageBody>
            <PageSection>
                <!--
                <PageUser :user="currentUser"/>
                -->
                <div class="mb-3 p-3 text-light-100 shadow-lg shadow-black/20 dark:shadow-black/40">
                    <p class="text-lg text-weight-800">Users</p>
                    <table class="min-w-full text-left text-sm font-light">
                        <thead class="border-b font-medium dark:border-neutral-500">
                            <tr class="table-row">
                                <th scope="col" class="px-1 py-1"></th>
                                <th scope="col" class="px-1 py-1" style="width:20px">Status</th>
                                <th scope="col" class="px-6 py-4">Full Name</th>
                                <th scope="col" class="px-6 py-4">Email Address</th>
                                <th scope="col" class="px-6 py-4">Roles</th>
                            </tr>
                        </thead>
                        <tbody class="table-row-group">
                            <tr v-for="user in users" :key="user.id" class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                <td class="whitespace-nowrap px-1 py-1 font-medium"><img style="height:30px" :src="user.avatar"/></td>
                                <td class="whitespace-nowrap px-1 py-1" style="width:20px"><input type="checkbox" :checked="user.status" disabled/></td>
                                <td class="whitespace-nowrap px-6 py-4">{{ user.fullName }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ user.email }}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{ user.roles.join(',') }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </PageSection>
        </PageBody>
    </PageWrapper>
</template>
