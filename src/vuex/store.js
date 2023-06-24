import Vuex from "vuex";
import ProductModule from "./modules/ProductModule";
import SecurityModule from "./modules/SecurityModule";
import AppVueModule from "./modules/AppVueModule";
import ShopModule from "./modules/ShopModule";
import RoleModule from "./modules/RoleModule";
import UserModule from "./modules/UserModule";
import AccountModule from "./modules/AccountModule";
import OrderModule from "./modules/OrderModule";

export default new Vuex.Store({
    modules: {
        ProductModule,
        SecurityModule,
        AppVueModule,
        ShopModule,
        RoleModule,
        UserModule,
        AccountModule,
        OrderModule,
    }
})
