const state = {
    inactiveNavbar: true,
    restartRouterView: false,
}

const mutations = {
    setInactiveNavbar(state, value) {state.inactiveNavbar = value},
    setRestartRouterView(state, isBoolean) {
        state.restartRouterView = isBoolean
    },
}

const getters = {
    getInactiveNavbar: state => state.inactiveNavbar,
    getRestartRouterView: state => state.restartRouterView,
}

export default {
    namespaced: true,
    state,
    mutations,
    getters
}