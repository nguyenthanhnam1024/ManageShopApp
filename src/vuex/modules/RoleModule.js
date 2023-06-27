import axios from "axios"

const state = {
    listRole: null,
    role: {
        id: null,
        roleName: null,
    },
    activeOfPopup: false,
    roleNames: null,
    roleIdAsDelete: null,
}

const mutations = {
    setListRole(state, listRole) { state.listRole = listRole },
    setRole(state, role) { state.role = role },
    setActiveOfPopup(state, value) { state.activeOfPopup = value},
    setRoleNames(state, roleNames) { state.roleNames = roleNames },
    setRoleIdAsDelete(state, value) { state.roleIdAsDelete = value },

}

const actions = {
    async fetchRoleList({ commit }) {
        try {
            const response =  await axios.get("http://localhost:8088/role/getAll")
            if (response.status == 200 ) {
                commit("setListRole", response.data)
            }
        } catch (error) {
            return error.response
        }
    },

    async saveRole() {
        try {
            return await axios.post("http://localhost:8088/role/save", state.role)
        } catch (error) {
            return error.response
        }
    },

    async fetchRoleNames({ commit }) {
        try {
            const response = await axios.get("http://localhost:8088/role/getRoleNames")
            if (response.status == 200 ) {
                commit("setRoleNames", response.data)
            }
        } catch (error) {
            return error.response
        }
    },

    async deleteRole() {
        try {
            return await axios.delete("http://localhost:8088/role/delete/"+ state.roleIdAsDelete)
        } catch (error) {
            return error.response
        }
    },
}
const getters = {
    getListRole: state => state.listRole,
    getRole: state => state.role,
    getActiveOfPopup: state => state.activeOfPopup,
    getRoleNames: state => state.roleNames,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}