const state = {
    inactiveNavbar: true,
}

const mutations = {
    setInactiveNavbar(state, value) {state.inactiveNavbar = value},
}

const getters = {
    getInactiveNavbar: state => state.inactiveNavbar,
}

export default {
    namespaced: true,
    state,
    mutations,
    getters
}