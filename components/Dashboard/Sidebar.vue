<script lang="ts">
export default defineComponent({
  props: {
    mode: {
      type: String,
      default: 'normal',
    },
  },
  setup() {
    const sidebar = ref(null)

    onMounted(() => {
       const { onScroll } = useSticky(sidebar.value, -1000)
       setTimeout(() => onScroll(), 50)
    })

    return {
      sidebar,
    }
  },
})
</script>

<template>
  <div
    ref="sidebar"
    :class="{
      'fixed top-0 hidden pt-12 lg:flex lg:w-60 xl:w-80 h-screen':
        mode === 'normal',
      'relative flex-1 flex flex-col w-full': mode === 'mobile',
    }"
  >
    <div class="flex-1 overflow-y-auto pl-4 lg:pl-0 pr-4 py-4">
      <ul>
        <li>
          <Anchor
            :to="{ name: 'malls' }"
            class="group flex items-center mb-4 hover:no-underline"
          >
            <div
              class="text-white dark:text-white group-hover:bg-sky-500 bg-sky-500 flex items-center mr-4 px-2 py-2 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-sky-200 dark:highlight-white/10"
            >
              <IconUil:apps class="text-xs" />
            </div>
            <span
              class="text-sm font-semibold capitalize font-extrabold text-sky-500 dark:text-sky-400"
            >
              {{ $t('pages.malls.title') }}
            </span>
          </Anchor>
        </li>
      </ul>
    </div>
  </div>
</template>
