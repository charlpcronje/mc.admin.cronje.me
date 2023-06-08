

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle :text="$t('pages.login.title')" class="capitalize" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <LoginPage/>  
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>

<script lang="ts" setup>
import { capitalize } from '~/utils/str'
import LoginPage from '@/components/LoginPage.vue'
// composable
const { t } = useLang()

// compiler macro
definePageMeta({
  layout: 'page',
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
</script>