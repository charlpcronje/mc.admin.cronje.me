<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
})
</script>

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
            <tr>
              <td class="img"></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </PageSection>
      <PageSection> </PageSection>
    </PageBody>
  </PageWrapper>
</template>
