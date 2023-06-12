<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle :text="$t('pages.contactUs.title')" class="capitalize" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <div>Contact Us Page</div>
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
  title: capitalize(t('pages.contactUs.title')),
  meta: [{
      name: 'description',
      content: t('pages.contactUs.description'),
    }
  ]
}))
</script>