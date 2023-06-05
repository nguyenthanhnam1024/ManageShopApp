import axios from "axios"

const state = {
    user: {
        shop: {
            id: null,
            name: null,
            address: null,
            hotline: null,
        },
        role: null,
        name: null,
        age: null,
        email: null,
        phoneNumber: null,
        address: null
    },
    shop: {
        id: null,
        name: null,
        address: null,
        hotline: null,
    },
    accountLogin: {
        userName: null,
        password: null,
    },
    requestRegister: null,
    fieldsErrorMap: [],
    accessToken: null,
}
const mutations = {
    setAcconutLogin(state, account) { state.accountLogin = account },
    setUser(state, user) { state.user = user },
    setShop(state, shop) { state.shop = shop},
    setRequestRegister(state, request) { state.requestRegister = request },
    setFieldsErrorMap(state, errorMap) { state.fieldsErrorMap = errorMap },
    setAccessToken(state, jwt) { state.accessToken = jwt},
}
const actions = {
    async logout() {
        try {
            return await axios.post("http://localhost:8088/security/logout", {headers: {"Authorization": state.accessToken}})
        } catch (error) {
            return error.response
        }
    },
    async registerUser({ commit }) {
        const requestRegister = state.requestRegister
        try {
            const response = await axios.post("http://localhost:8088/security/register", requestRegister)
            if (response.status == 1000) {
                commit("setFieldsErrorMap", response.data)
            }
            return response
        } catch (error) {
            return error.response
        }
    },
    async login({ commit }) {
        const accountLogin = state.accountLogin;
        try {
            const response = await axios.post("http://localhost:8088/security/login", accountLogin)
            commit("setUser", response.data)
            commit("setShop", response.data.shop)
            commit("setAccessToken", response.headers.get("Authorization"))
            localStorage.setItem('user', JSON.stringify(response.data))
            localStorage.setItem('shop', JSON.stringify(response.data.shop))
            localStorage.setItem('accessToken', response.headers.get("Authorization"))
            return response
        } catch (error) {
            return error.response
        }
    },
}
const getters = {
    getUser: state => state.user,
    getShop: state => state.shop,
    getFieldsErrorMap: state => state.fieldsErrorMap,
    getAccessToken: state => state.accessToken,
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}