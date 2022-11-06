import booksService from '../services/books.service'

const state = {

}

const getters = {

}

const mutations = {
}

const actions = {
    async A_GET_BOOKS({ commit }, params) {
        const response = await booksService.getBooks(params)
        return response
    },
    async A_GET_BOOK({ commit }, id) {
        const response = await booksService.getBook(id)
        return response
    },
    async A_REGISTER_BOOK({ commit }, body) {
        const response = await booksService.register(body)
        return response
    },
    async A_UPDATE_BOOK({ commit }, { id, body }) {
        const response = await booksService.update(id, body)
        return response
    },
    async A_DELETE_BOOK({ commit }, id) {
        const response = await booksService.delete(id)
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