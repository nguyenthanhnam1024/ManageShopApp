const state = {
    inactiveNavbar: true,
    restartRouterView: false,
    curentURL: null,
    fieldsErrorMap: [],
}

const mutations = {
    setInactiveNavbar(state, value) {state.inactiveNavbar = value},
    setRestartRouterView(state, isBoolean) { state.restartRouterView = isBoolean },
    setCurrentURL(state, value) { state.curentURL = value },
    setFieldsErrorMap(state, errorMap) { state.fieldsErrorMap = errorMap },
}

const getters = {
    getInactiveNavbar: state => state.inactiveNavbar,
    getRestartRouterView: state => state.restartRouterView,
    getCurrentURL: state => state.curentURL,
    getFieldsErrorMap: state => state.fieldsErrorMap,
}

export default {
    namespaced: true,
    state,
    mutations,
    getters
}