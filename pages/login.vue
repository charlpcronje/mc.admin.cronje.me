<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle :text="$t('pages.login.title')" class="capitalize" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <LoginPage @success="onLoginSuccess"/>  
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>

<script lang="ts" setup>
import { capitalize } from '~/utils/str'
import LoginPage from '@/components/LoginPage.vue'
import { user } from "~/models/user";
// composable
const { t } = useLang()

// compiler macro
definePageMeta({
  layout: 'page',
  middleware: ["guest-only"]
})

useHead(() => ({
  title: capitalize(t('pages.login.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.login.description'),
    },
  ],
}))

async function onLoginSuccess() {
    const redirect = user.isAdmin ? "/admin" : "/private";
    await navigateTo(redirect);
}
</script>