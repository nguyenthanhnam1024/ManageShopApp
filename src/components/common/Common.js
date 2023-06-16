import store from "@/vuex/store";
import router from "@/router";

export default class Common {

    redirectByJwtAndUrl() {
        const currentURL = window.location.href;
        if (
            currentURL == "http://localhost:8080/register" ||
            currentURL == "http://localhost:8080/"
        ) {
            store.commit('AppVueModule/setInactiveNavbar', true);
        } else {
            store.commit('AppVueModule/setInactiveNavbar', false);
        }
        const userFromLocalStorage = JSON.parse(localStorage.getItem('user'))
        if (userFromLocalStorage) {
            const userFromApp = store.getters['SecurityModule/getUser'];
            if (userFromApp.name != userFromLocalStorage.name) {
                store.commit('SecurityModule/setUser', userFromLocalStorage)
                store.commit('SecurityModule/setShop', JSON.parse(localStorage.getItem('shop')))
                store.commit('SecurityModule/setAccessToken', localStorage.getItem('accessToken'))
            }
        }
        const jwt = store.getters['SecurityModule/getAccessToken']
        if (jwt == null || jwt == "") {
            if (currentURL != "http://localhost:8080/register" && currentURL != "http://localhost:8080/") {
                router.push({ path: "/" })
            }
        }
        if (currentURL == "http://localhost:8080/shop") {
            store.commit('SecurityModule/setShop', JSON.parse(localStorage.getItem('shop')))
        }
    }
}