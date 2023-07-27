import axios from "axios"

const state = {
    inActiveBlockUpdatePassword: true,
    requestUpdateUser: {
        shop: null,
        role: null,
        name: null,
        oldName: null,
        userNameOfAccount: null,
        age: null,
        email: null,
        phoneNumber: null,
        address: null,
    },
    stateOfConfirmUpdateProfile: false,
    requestAccount: {
        nameOfUser: null,
        userNameOfAccount: null,
        oldPassword: null,
        newPassword: null,
    },
}

const mutations = {
    setInActiveBlockUpdatePassword(state, value) { state.inActiveBlockUpdatePassword = value },
    setRequestUpdateUser(state, value) { state.requestUpdateUser = value },
    setStateOfConfirmUpdateProfile(state, value) { state.stateOfConfirmUpdateProfile = value },
    setRequestAccount(state, value) { state.requestAccount = value },
 }

const actions = {
    async updateProfile() {
        try {
            const response =  await axios.put("http://localhost:8088/user/update", state.requestUpdateUser)
            if(response.status == 200) {
                localStorage.setItem('user', JSON.stringify(response.data))
            }
            return response
        } catch (error) {
            return error.response
        }
    },

    async updatePassword() {
        try {
            return await axios.put("http://localhost:8088/account/update", state.requestAccount)
        } catch (error) {
            return error.response
        }
    }
} 

const getters = {
    getInActiveBlockUpdatePassword: state => state.inActiveBlockUpdatePassword,
    getRequestUpdateUser: state => state.requestUpdateUser,
    getStateOfConfirmUpdateProfile: state => state.stateOfConfirmUpdateProfile,
    getRequestAccount: state => state.requestAccount,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}