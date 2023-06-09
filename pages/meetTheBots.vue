<template>
    <PageWrapper>
      <PageHeader>
        <PageTitle :text="$t('pages.meetTheBots.title')" class="capitalize" />
      </PageHeader>
      <PageBody>
        <PageSection>
          <div>Meet the bots page</div>
        </PageSection>
      </PageBody>
    </PageWrapper>
  </template>
  
  <script lang="ts" setup>
  import { capitalize } from '~/utils/str'
  // composable
  const { t } = useLang()
  
  // compiler macro
  definePageMeta({
    layout: 'page',
  })
  useHead(() => ({
    title: capitalize(t('pages.meetTheBots.title')),
    meta: [
      {
        name: 'description',
        content: t('pages.meetTheBots.description'),
      },
    ],
  }))
  </script>