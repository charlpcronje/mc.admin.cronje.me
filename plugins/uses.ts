

export default defineNuxtPlugin((nuxtApp:any):object => {
    return useSession();
    // now available on `nuxtApp.$injected`
    nuxtApp.provide('injected', () => 'my injected function')
  
    // You can alternatively use this format, which comes with automatic type support
    return {
        mcApp: nuxtApp,
        mcSession: useSession()
    }
});


