import { createRouter, createWebHistory } from "vue-router";

import Product from "./components/product/Product"
import Login from "./components/security/Login"
import Register from "./components/security/Register"
import Shop from "./components/shop/Shop"

const routes = [
    {path: "/", component: Login},
    {path: "/register", component: Register},
    {path: "/product", component: Product},
    {path: "/shop", component: Shop},
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;