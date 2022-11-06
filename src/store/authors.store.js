import authorsService from '../services/authors.service'

const state = {

}

const getters = {

}

const mutations = {
}

const actions = {
    async A_GET_AUTHORS({ commit }) {
        const response = await authorsService.getAuthors()
        return response
    },
    async A_GET_AUTHOR({ commit }, id) {
        const response = await authorsService.getAuthor(id)
        return response
    },
    async A_REGISTER_AUTHOR({ commit }, body) {
        const response = await authorsService.register(body)
        return response
    },
    async A_UPDATE_AUTHOR({ commit }, { id, body }) {
        const response = await authorsService.update(id, body)
        return response
    },
    async A_DELETE_AUTHOR({ commit }, id) {
        const response = await authorsService.delete(id)
        return response
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}