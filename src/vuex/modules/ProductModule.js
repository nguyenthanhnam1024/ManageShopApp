import axios from "axios"
import store from "../store"

const state = {
    productList: [],
    activeFormProduct: false,
    stateBtnSaveFormProduct: false,
    stateBtnUpdateFormProduct: false,
    product: {
        id: null,
        name: null,
        idShop: 1,
        price: null,
        described: null,
        dateOfManufacture: null,
        expiry: null,
        origin: null,
    },
    idProduct: null,
    keywordForSearchProduct: null,
}

const mutations = {
    setProductList(state, productList) { state.productList = productList },
    setActiveFormProduct(state, isBoolean) { state.activeFormProduct = isBoolean },
    setStateBtnSaveFormProduct(state, isBoolean) { state.stateBtnSaveFormProduct = isBoolean },
    setStateBtnUpdateFormProduct(state, isBoolean) { state.stateBtnUpdateFormProduct = isBoolean },
    setProduct(state, product) { state.product = product },
    setIdProduct(state, value) { state.idProduct = value },
    setKeywordForSearchProduct(state, value ) { state.keywordForSearchProduct = value },
}

const actions = {
    async fetchProductList({ commit }) {
        let shop = store.getters["SecurityModule/getShop"]
        try {
            const response = await axios.get('http://localhost:8088/product/getByIdShop/' + shop.id)
            if (response.status == 200) {
                commit('setProductList', response.data)
            }
            
        } catch (error) {
            return error.response
        }
    },

    async getProductById({ commit }) {
        let shop = store.getters["SecurityModule/getShop"]
        try {
            const response = await axios.get('http://localhost:8088/product/getById/' + state.idProduct + "/" + shop.id)
            if (response.status == 200) {
                commit('setProduct', response.data)
            }
        } catch (error) {
            return error.response
        }
    },

    async saveProduct() {
        const idShop = store.getters["SecurityModule/getShop"].id;
        try {
            return await axios.post('http://localhost:8088/product/save/' + idShop , state.product);
        } catch (error) {
            return error.response
        }
    },

    async updateProduct() {
        const idShop = store.getters["SecurityModule/getShop"].id;
        try {
            return await axios.put('http://localhost:8088/product/update/' + idShop, state.product);
        } catch (error) {
            return error.response
        }
    },

    async deleteProduct() {
        const idShop = store.getters["SecurityModule/getShop"].id;
        try {
            return await axios.delete('http://localhost:8088/product/delete/' + idShop + '/' + state.idProduct)
        } catch (error) {
            return error.response
        }
    },

    async searchProduct({ commit }) {
        const idShop = store.getters["SecurityModule/getShop"].id;
        try {
            const response = await axios.get('http://localhost:8088/product/searchProductByKeyword/' + idShop + '?keyword=' + state.keywordForSearchProduct)
            commit('setProductList', response.data)
        } catch (error) {
            return error.response
        }
    },

}

const getters = {
    getProductList: state => state.productList,
    getActiveFormProduct: state => state.activeFormProduct,
    getStateBtnSaveFormProduct: state => state.stateBtnSaveFormProduct,
    getStateBtnUpdateFormProduct: state => state.stateBtnUpdateFormProduct,
    getProduct: state => state.product,
    getIdProduct: state => state.idProduct,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}