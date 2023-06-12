<template>
    <PageWrapper>
        <PageHeader>
            <PageTitle :text="$t('pages.account.title')" class="capitalize" />
        </PageHeader>
        <PageBody>
            <PageSection>
                <h3>User Account Page</h3>
                <PageUser :user="currentUser" />
            </PageSection>
        </PageBody>
    </PageWrapper>
</template>
  
<script lang="ts" setup>
import { capitalize } from '~/utils/str'
const currentUser = useAuthUser();

// composable
const { t } = useLang()

// compiler macro
definePageMeta({
    layout: 'page'
})
useHead(() => ({
    title: capitalize(t('pages.account.title')),
    meta: [{
            name: 'description',
            content: t('pages.account.description'),
        }
    ]
}))
</script>