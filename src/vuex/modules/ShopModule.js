import axios from "axios"

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
    idShopAsDelete: null,
}

const mutations = {
    setShopList(state, shoplist) { state.shopList = shoplist },
    setActiveOfPopup(state, activeOfPopup) { state.activeOfPopup = activeOfPopup },
    setStateBtnSaveOfForm(state, stateBtnSaveOfForm) { state.stateBtnSaveOfForm = stateBtnSaveOfForm },
    setStateBtnUpdateOfForm(state, stateBtnUpdateOfForm) { state.stateBtnUpdateOfForm = stateBtnUpdateOfForm },
    setShop(state, shop) { state.shop = shop },
    setIdShopAsDelete(state, id) { state.idShopAsDelete = id },
}

const actions = {
    async fetchShopList({ commit }) {
        try {
            const response = await axios.get("http://localhost:8088/shop/getShopList")
            if (response.status == 200) {
                commit("setShopList", response.data)
            }
        } catch (error) {
            return error.response
        }
    },

    async searchShopByKeyword({ commit }, keyword) {
        try {
            const response = await axios.get("http://localhost:8088/shop/getByKeyword?keyword=" + keyword)
            if (response.status == 200) {
                commit("setShopList", response.data)
            }
        } catch (error) {
            return error.response
        }
    },

    async saveShop() {
        try {
            return await axios.post("http://localhost:8088/shop/save", state.shop)
        } catch (error) {
            return error.response
        }
    },

    async getShopById({ commit }, id) {
        try {
            const response =  await axios.get("http://localhost:8088/shop/getById/" + id)
            if (response.status == 200) {
                commit("setShop", response.data)
            }
            return response
        } catch (error) {
            return error.response
        }
    },

    async updateShop() {
        try {
            return await axios.put("http://localhost:8088/shop/update", state.shop)
        } catch (error) {
            return error.response
        }
    },

    async deleteShop() {
        try {
            return await axios.delete("http://localhost:8088/shop/delete/"+state.idShopAsDelete)
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