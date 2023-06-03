import axios from "axios"

const state = {
    shopList: null,
}

const mutations = {
    setShopList(state, shoplist) { state.shopList = shoplist },
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
    }
}
const getters = {
    getShopList: state => state.shopList,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}