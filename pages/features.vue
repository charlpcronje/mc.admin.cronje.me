<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle :text="$t('pages.features.title')" class="capitalize" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <div>Meet the bots page</div>
        <div>
          Mall Chat is a chat bot for shopping malls that provides users with all the information they need in an easy and convenient way. With Mall Chat, users can quickly and easily access store information, hours, promotions, and more. Mall Chat also offers helpful features such as location-based recommendations and personalized offers, making it easy to find the perfect shopping experience. With Mall Chat, you can get all the info you need, the way you want it.
        </div>
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
  title: capitalize(t('pages.features.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.features.description'),
    },
  ],
}))
</script>