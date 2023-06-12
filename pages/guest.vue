<script lang="ts" setup>
import { capitalize } from '~/utils/str'
// composable
const { t } = useLang()

// compiler macro
definePageMeta({
  layout: 'page',
})
useHead(() => ({
  title: capitalize(t('pages.guest.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.guest.description'),
    },
  ],
}))

definePageMeta({
    middleware: ["guest-only"],
});

const currentUser = useAuthUser();
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle :text="$t('pages.guest.title')" class="capitalize" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <PageUser :user="currentUser" />
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
