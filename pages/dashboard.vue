<template>
    <PageWrapper>
      <PageHeader>
        <PageTitle :text="$t('pages.dashboard.title')" class="capitalize" />
      </PageHeader>
      <PageBody>
        <PageSection>
            <div>dashboard</div>
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
    title: capitalize(t('pages.dashboard.title')),
    meta: [
      {
        name: 'description',
        content: t('pages.dashboard.description'),
      },
    ],
  }))
  </script>