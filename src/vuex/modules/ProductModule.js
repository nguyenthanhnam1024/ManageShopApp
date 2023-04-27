import axios from "axios"

const state = {
    productList: [],
    activeFormProductPopup: false,
    buttonCreateInFormProductPopup: false,
    buttonUpdateInFormProductPopup: false,
    activeAlertProductPopup: false,
    messageAlertProductPopup: "",
    productEdit: {
        id: null,
        name: "",
        idShop: 1,
        price: null,
        described: "",
        dateOfManufacture: "",
        expiry: "",
        origin: ""
    },
    restartRouterView: false,
    fieldsErrorMap: [],
    activeAlertForFormProductPopup: false,
    messageAlertForFormProductPopup: "",
    activeConfirmDeleteProductPopupInModule: false,
}

const mutations = {
    setProductList(state, productList) {
        state.productList = productList
    },
    setActiveFormProductPopup(state, isBoolean) {
        state.activeFormProductPopup = isBoolean
    },
    setButtonCreateFormProductPopup(state, isBoolean) {
        state.buttonCreateInFormProductPopup = isBoolean
    },
    setButtonUpdateFormProductPopup(state, isBoolean) {
        state.buttonUpdateInFormProductPopup = isBoolean
    },
    setActiveAlertProductPopup(state, isBoolean) {
        state.activeAlertProductPopup = isBoolean
    },
    setMessageAlertProductPopup(state, message) {
        state.messageAlertProductPopup = message
    },
    setProductEdit(state, product) {
        state.productEdit = product
    },
    setRestartRouterView(state, isBoolean) {
        state.restartRouterView = isBoolean
    },
    setFieldsErrorMap(state, fieldsErrorMap) {
        state.fieldsErrorMap = fieldsErrorMap
    },
    setActiveAlertForFormProductPopup(state, isBoolean) {
        state.activeAlertForFormProductPopup = isBoolean
    },
    setMessageAlertForFormProductPopup(state, message) {
        state.messageAlertForFormProductPopup = message
    }
}

const actions = {
    async fetchProductList({ commit }, shopId) {
        try {
            const response = await axios.get('http://localhost:8088/product/getByIdShop/' + shopId)
            if (response.status == 400) {
                commit('setMessageAlertProductPopup', response.data)
                commit('setActiveAlertProductPopup', true)
            }
            commit('setProductList', response.data)
        } catch (error) {
            return error.response
        }
    },

    async getProductById({ commit }, productId) {
        try {
            const response = await axios.get('http://localhost:8088/product/getById/' + productId)
            if (response.status == 400) {
                commit('setMessageAlertProductPopup', response.data)
                commit('setActiveAlertProductPopup', true)
            }
            commit('setProductEdit', response.data)
        } catch (error) {
            return error.response
        }
    },

    async saveProduct() {
        try {
            const product = state.productEdit
            return await axios.post('http://localhost:8088/product/save', product);
        } catch (error) {
            return error.response
        }
    },

    async updateProduct() {
        try {
            const product = state.productEdit
            return await axios.put('http://localhost:8088/product/update', product);
        } catch (error) {
            return error.response
        }
    },

    async deleteProduct() {
        try {
            const product = state.productEdit
            return await axios.delete('http://localhost:8088/product/delete/' + product.id + '/' + product.idShop)
        } catch (error) {
            return error.response
        }
    },

    async searchProduct({ commit }, keyword) {
        try {
            const response = await axios.get('http://localhost:8088/product/searchProductByKeyword?keyword=' + keyword)
            if (response.status == 400) {
                commit('setRestartRouterView', !state.getRestartRouterView)
                commit('setMessageAlertProductPopup', response.data)
                commit('setActiveAlertProductPopup', true)
            }
            commit('setProductList', response.data)
        } catch (error) {
            return error.response
        }
    },

}

const getters = {
    getProductList: state => state.productList,
    getActiveFormProductPopup: state => state.activeFormProductPopup,
    getButtonCreateInFormProductPopup: state => state.buttonCreateInFormProductPopup,
    getButtonUpdateInFormProductPopup: state => state.buttonUpdateInFormProductPopup,
    getActiveAlertProductPopup: state => state.activeAlertProductPopup,
    getMessageAlertProductPopup: state => state.messageAlertProductPopup,
    getProductEdit: state => state.productEdit,
    getRestartRouterView: state => state.restartRouterView,
    getFieldsErrorMap: state => state.fieldsErrorMap,
    getActiveAlertForFormProductPopup: state => state.activeAlertForFormProductPopup,
    getMessageAlertForFormProductPopup: state => state.messageAlertForFormProductPopup
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}