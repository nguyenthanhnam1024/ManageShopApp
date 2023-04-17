import { createRouter, createWebHistory } from "vue-router";

import Product from "./components/Product";

const routes = [
    {path: "/", component: Product}
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;