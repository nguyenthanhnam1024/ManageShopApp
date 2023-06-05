import axios from "axios"
import store from "../store"

const state = {
    shopList: null,
    activeOfPopup: false,
    stateBtnSaveOfForm: false,
    stateBtnUpdateOfForm: false,
    shop: {
        id: null,
        name: null,
        address: null,
        hotline: null,
    },
}

const mutations = {
    setShopList(state, shoplist) { state.shopList = shoplist },
    setActiveOfPopup(state, activeOfPopup) { state.activeOfPopup = activeOfPopup },
    setStateBtnSaveOfForm(state, stateBtnSaveOfForm) { state.stateBtnSaveOfForm = stateBtnSaveOfForm },
    setStateBtnUpdateOfForm(state, stateBtnUpdateOfForm) { state.stateBtnUpdateOfForm = stateBtnUpdateOfForm },
    setShop(state, shop) { state.shop = shop },
}

const actions = {
    async fetchShopList({ commit }) {
        try {
            const response = await axios.get("http://localhost:8088/shop/getShopList")
            if (response.status == 200) {
                commit("setShopList", response.data)
            }
        } catch (error) {
            error.response
        }
    },

    async searchShopByKeyword({ commit }, datas) {
        try {
            const response = await axios.post("http://localhost:8088/shop/getByKeyword?keyword=" + datas.keyword, datas.user)
            if (response.status == 200) {
                commit("setShopList", response.data)
            }
        } catch (error) {
            return error.response
        }
    },

    async saveShop() {
        const user = store.getters['SecurityModule/getUser']
        const data = {
            shop: state.shop,
            responseLogin: JSON.parse(JSON.stringify(user))
        }
        try {
            return await axios.post("http://localhost:8088/shop/save", data)
        } catch (error) {
            return error.response
        }
    },

    async updateShop(user) {
        const data = {
            shop: state.shop,
            user: user,
        }
        try {
            return await axios.put("http://localhost:8088/shop/update", data)
        } catch (error) {
            return error.response
        }
    },
}
const getters = {
    getShopList: state => state.shopList,
    getActiveOfPopup: state => state.activeOfPopup,
    getStateBtnSaveOfForm: state => state.stateBtnSaveOfForm,
    getStateBtnUpdateOfForm: state => state.stateBtnUpdateOfForm,
    getShop: state => state.shop,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}