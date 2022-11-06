import usersService from '../services/users.service'

const state = {

}

const getters = {

}

const mutations = {
}

const actions = {
    async A_LOGIN({ commit }, body) {
        const response = await usersService.login(body)
        return response
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}