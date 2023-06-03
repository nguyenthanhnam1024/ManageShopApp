import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import store from '@/vuex/store'
import axios from 'axios';

const app = createApp(App)
app.use(router)
app.use(store)
app.mount("#app")

axios.interceptors.request.use(function (config) {
    const token = store.getters['SecurityModule/getAccessToken'];
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

