import store from "./vuex/store";
import router from "./router";

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
        const jwt = store.getters['SecurityModule/getAccessToken'];
        if (jwt == null || jwt == "") {
            if (currentURL != "http://localhost:8080/register" && currentURL != "http://localhost:8080/") {
                router.push({ path: "/" })
            }
        }
    }
}