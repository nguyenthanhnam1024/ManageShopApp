import axios from "axios"
import store from "../store"

const state = {
    listUser: null,
    user: {
        id: null,
        idShop: null,
        idAccount: null,
        name: null,
        age: null,
        phoneNumber: null,
        email: null,
        address: null,
    },
    requestUser: {
        userName: null,
        password: null,
        idShop: null,
        roleName: null,
        name: null,
        age: 100,
        phoneNumber: "0000000000",
        email: null,
        address: "new address",
    },
    dataRequestAsSearch: {
        keyword: "",
        roleName: "",
    },
    idUser: null,
    activeOfPopup: false,
    inactiveBtnSaveOfPopup: false,
    inactiveBtnUpdateOfPopup: false,
}

const mutations = {
    setRequestUser(state, value) { state.requestUser = value },
    setListUser(state, value) { state.listUser = value },
    setDataRequestAsSearch(state, value) { state.dataRequestAsSearch = value },
    setIdUser(state, value) { state.idUser = value },
    setActiveOfPopup(state, value) { state.activeOfPopup = value },
    setInactiveBtnSaveOfPopup(state, value) { state.inactiveBtnSaveOfPopup = value },
    setInactiveBtnUpdateOfPopup(state, value) { state.inactiveBtnUpdateOfPopup = value },
    setRequestUserAsUpdate(state, requestUser) { state.requestUser = requestUser },
}

const actions = {
    async fetchListUser({ commit }) {
        const shop = JSON.parse(JSON.stringify(store.getters['SecurityModule/getShop']));
        try {
            const response = await axios.get("http://localhost:8088/user/getAll/" + shop.id)
            if (response.status == 200) {
                commit("setListUser", response.data)
            }
        } catch (error) {
            return error.response
        }
    },

    async getByIdAndSetToFormEdit({ commit }) {
        try {
            const response = await axios.get("http://localhost:8088/user/getById/" + state.idUser)
            if (response.status == 200) {
                commit("setRequestUserAsUpdate", response.data)
            }
        } catch (error) {
            return error.response
        }
    },

    async saveUserFromAdmin() {
        try {
            return await axios.post("http://localhost:8088/user/saveFromADMIN", state.requestUser)
        } catch (error) {
            return error.response
        }
    },

    async updateUser() {
        try {
            return await axios.put("http://localhost:8088/user/update", state.requestUpdateUser)
        } catch (error) {
            return error.response
        }
    },

    async updateUserFromADMIN() {
        try {
            return await axios.put("http://localhost:8088/user/updateFromADMIN", state.requestUser)
        } catch (error) {
            return error.response
        }
    },

    async searchByKeyword({ commit }) {
        let shop = store.getters['SecurityModule/getShop']
        try {
            const response = await axios.get("http://localhost:8088/user/searchByKeyword",
                {
                    params: {
                        keyword: state.dataRequestAsSearch.keyword,
                        roleName: state.dataRequestAsSearch.roleName, 
                        idShopCurrent: shop.id,
                    }
                }
            )
            if (response.status == 200) {
                commit("setListUser", response.data)
            }
        } catch (error) {
            return error.response
        }
    },

    async deleteUser() {
        try {
            return await axios.delete("http://localhost:8088/user/delete/" + state.idUser)
        } catch (error) {
            return error.response
        }
    },
}
const getters = {
    getListUser: state => state.listUser,
    getRequestUser: state => state.requestUser,
    getRequestUpdateUser: state => state.requestUpdateUser,
    getDataRequestAsSearch: state => state.dataRequestAsSearch,
    getActiveOfPopup: state => state.activeOfPopup,
    getInactiveBtnSaveOfPopup: state => state.inactiveBtnSaveOfPopup,
    getInactiveBtnUpdateOfPopup: state => state.inactiveBtnUpdateOfPopup,
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}