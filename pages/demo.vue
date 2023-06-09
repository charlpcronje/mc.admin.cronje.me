<template>
    <PageWrapper>
      <PageHeader>
        <PageTitle :text="$t('pages.demo.title')" class="capitalize" />
      </PageHeader>
      <PageBody>
        <PageSection>
          <div>Chat Bot Demo</div>
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
    title: capitalize(t('pages.demo.title')),
    meta: [
      {
        name: 'description',
        content: t('pages.demo.description'),
      },
    ],
  }))
  </script>