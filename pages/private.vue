<script lang="ts" setup>
import { capitalize } from '~/utils/str'

definePageMeta({
    middleware: ["user-only"],
});
const currentUser = useAuthUser();


// composable
const { t } = useLang()

// compiler macro
definePageMeta({
  layout: 'page',
})
useHead(() => ({
  title: capitalize(t('pages.private.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.private.description'),
    },
  ],
}))
</script>


<template>
    <PageWrapper>
      <PageHeader>
        <PageTitle :text="$t('pages.private.title')" class="capitalize" />
      </PageHeader>
      <PageBody>
        <PageSection>
            <PageUser :user="currentUser" />
        </PageSection>
      </PageBody>
    </PageWrapper>
  </template>
