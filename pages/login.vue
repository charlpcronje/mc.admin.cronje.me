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
import { capitalize } from '~/utils/str';
import LoginPage from '@/components/LoginPage.vue';
import { useUserStore } from '~/stores/user';
const {userState} = useUserStore();

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
    //const redirect = userState.value.isAdmin ? "/admin" : "/private";
    const redirect = false ? "/admin" : "/private";
    await navigateTo(redirect);
}
</script>