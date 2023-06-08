<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle :text="$t('pages.malls.title')" class="capitalize" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Mall Name</th>
              <th>URL</th>
              <th>Poster</th>
              <th>User Icon</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in results" :key="item.id">
              <td class="img"></td>
              <td>{{ item.properties.Title.title[0].text.content }}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>

<script lang="ts" setup>  
import { useNotionDatabase } from '@/services/notion.js'
import { capitalize } from '~/utils/str'
import LoginPage from '@/components/LoginPage.vue'
// composable
const { t } = useLang()

// compiler macro
definePageMeta({
  layout: 'page',
})
useHead(() => ({
  title: capitalize(t('pages.malls.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.malls.description'),
    },
  ],
}))

const results:any[] = [];

</script>