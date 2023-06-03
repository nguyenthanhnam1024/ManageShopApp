import Vuex from "vuex";
import ProductModule from "./modules/ProductModule";
import SecurityModule from "./modules/SecurityModule";
import AppVueModule from "./modules/AppVueModule";
import ShopModule from "./modules/ShopModule";

export default new Vuex.Store({
    modules: {
        ProductModule,
        SecurityModule,
        AppVueModule,
        ShopModule,
    }
})
