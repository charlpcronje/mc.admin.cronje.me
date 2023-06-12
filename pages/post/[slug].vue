<script lang="ts" setup>
definePageMeta({
  layout: 'page',
  middleware: ["guest-only"]
})

</script>

<template>
  <PageWrapper class="flex flex-col">
    <PageContentDoc empty-tip="Post im empty" />
  </PageWrapper>
</template>
