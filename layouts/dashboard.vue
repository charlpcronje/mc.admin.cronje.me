<template>
  <div>
    <slot name="app-before" />
    <div id="app-before"></div>
    <div class="flex flex-col min-h-screen">
      <slot name="header">
        <DashboardNavbar>
          <template #drawer>
            <DashboardSidebar mode="mobile" />
          </template>
        </DashboardNavbar>
      </slot>
      <div class="flex-1 w-full flex flex-col">
        <div
          class="relative flex-1 flex flex-row mx-auto w-full h-full">
         
          <div class="lg:pl-8 py-4">
            <DashboardSidebar />
          </div>
         
          <div class="flex flex-col   w-full lg:ml-40 xl:ml-100">
            <slot />
            <slot name="footer">
              <PageFooter />
            </slot>
          </div>
        </div>
      </div>
    </div>
    <slot name="app-after" />
    <div id="app-after"></div>
  </div>
</template>
