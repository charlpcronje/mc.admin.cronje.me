import * as dayjs from 'dayjs'

export default defineNuxtPlugin((nuxtApp: any):object => {
    return useSession();
  
    // You can alternatively use this format, which comes with automatic type support
    return {
        provide: {
            mcDate: dayjs().format("ddd DD MMMM 'YYYY @ HH:mm:ss"),
            rageApp: nuxtApp,
            regeSession: useSession()
        }
    }
});


