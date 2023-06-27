import axios from "axios"
import store from "../store"

const state = {
    listOrder: null,
    activeFromOrder: false,
    stateBtnSaveFormOrder: false,
    stateBtnUpdateFormOrder: false,
    idOrder: null,
    order: {
        id: null,
        date: null,
        shop: {},
        seller: {},
        product: {},
        quantity: null,
    },
    date: Date,
}

const mutations = {
    setListOrder(state, value) { state.listOrder = value },
    setActiveFormOrder(state, value) { state.activeFromOrder = value },
    setStateBtnSaveFormOrder(state, value) { state.stateBtnSaveFormOrder = value },
    setStateBtnUpdateFormOrder(state, value) { state.stateBtnUpdateFormOrder = value },
    setIdOrder(state, value) { state.idOrder = value },
    setOrder(state, value) { state.order = value },
    setDate(state, value) { state.date = value },
}

const actions = {
    async fetchListOrder({ commit }) {
        let shop = store.getters["SecurityModule/getShop"]
        try {
            const response = await axios.get("http://localhost:8088/order/getAll/" + shop.id)
            if (response.status == 200) {
                commit("setListOrder", response.data)
            }
        } catch (error) {
            return error.response
        }
    },

    async getOrderById({ commit }) {
        let shop = store.getters["SecurityModule/getShop"]
        try {
            const response = await axios.get("http://localhost:8088/order/getById/" + shop.id + "/" + state.idOrder)
            if (response.status == 200) {
                commit("setOrder", response.data)
            }
        } catch (error) {
            return error.response
        }
    },

    async deleteOrder() {
        let shop = store.getters["SecurityModule/getShop"]
        try {
            return await axios.delete("http://localhost:8088/order/delete/" + shop.id + "/" + state.idOrder)
        } catch (error) {
            return error.response
        }
    },

    async saveOrder() {
        let shop = store.getters["SecurityModule/getShop"]
        const data = {
            id: null,
            date: state.order.date,
            idShop: state.order.shop.id,
            idSeller: state.order.seller.id,
            idProduct: state.order.product.id,
            quantity: state.order.quantity,
        }
        console.log(data)
        try {
            return await axios.post("http://localhost:8088/order/save/" + shop.id, data)
        } catch (error) {
            return error.response
        }
    },

    async updateOrder() {
        let shop = store.getters["SecurityModule/getShop"]
        const data = {
            id: state.order.id,
            date: state.order.date,
            idShop: state.order.shop.id,
            idSeller: state.order.seller.id,
            idProduct: state.order.product.id,
            quantity: state.order.quantity,
        }
        try {
            return await axios.put("http://localhost:8088/order/update/" + shop.id, data)
        } catch (error) {
            return error.response
        }
    },

    async searchOrder({ commit }) {
        let shop = store.getters["SecurityModule/getShop"]
        try {
            const response = await axios.get("http://localhost:8088/order/search/" + shop.id + "/" + state.date)
            if (response.status == 200) {
                commit("setListOrder", response.data)
            }
        } catch (error) {
            return error.response
        }
    },
}

const getters = {
    getOrderList: state => state.listOrder,
    getActiveFormOrder: state => state.activeFromOrder,
    getStateBtnSaveFormOrder: state => state.stateBtnSaveFormOrder,
    getStateBtnUpdateFormOrder: state => state.stateBtnUpdateFormOrder,
    getOrder: state => state.order,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}