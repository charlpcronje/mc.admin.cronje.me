<script lang="ts" setup>
import { capitalize } from '~/utils/str'
definePageMeta({
  layout: 'dashboard',
  middleware: ["user-only"]
})
const currentUser = useAuthUser();

// composable
const { t } = useLang()

// compiler macro
definePageMeta({
  layout: 'dashboard',
})
useHead(() => ({
  title: capitalize(t('pages.dashboard.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.dashboard.description'),
    },
  ],
}))
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle :text="$t('pages.dashboard.index.title')" class="capitalize" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia autem
          debitis ab dolorum tempore placeat possimus perferendis porro sit aut
          nobis quasi hic consequuntur, atque impedit nihil totam illo odit?
        </p>
      </PageSection>
      <PageSection>
        <PageUser :user="currentUser" />
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
