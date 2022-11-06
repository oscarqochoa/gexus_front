import Vue from 'vue'
import Vuex from 'vuex'

import users from "./users.store"
import books from "./books.store"
import authors from "./authors.store"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        users,
        books,
        authors
    }
})
