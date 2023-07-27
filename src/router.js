import { createRouter, createWebHistory } from "vue-router";

import Product from "./components/product/Product"
import Login from "./components/security/Login"
import Register from "./components/security/Register"
import Shop from "./components/shop/Shop"
import Role from "./components/role/Role"
import User from "./components/user/User"
import Account from "./components/account/Account"
import Order from "./components/order/Order"

const routes = [
    {path: "/", component: Login},
    {path: "/register", component: Register},
    {path: "/product", component: Product},
    {path: "/shop", component: Shop},
    {path: "/role", component: Role},
    {path: "/user", component: User},
    {path: "/account", component: Account},
    {path: "/order", component: Order},
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;