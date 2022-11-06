import { serviceApi } from '@/axios'

class AuthorsService {

    async getAuthors() {
        try {
            const { data, status } = await serviceApi.get('/author/list')
            return { data, status }
        } catch (error) {
            console.log(error)
        }
    }

    async getAuthor(id) {
        try {
            const { data, status } = await serviceApi.get('/author/show/' + id)
            return { data, status }
        } catch (error) {
            console.log(error)
        }
    }

    async register(body) {
        try {
            const { data, status } = await serviceApi.post('/author/', body)
            return { data, status }
        } catch (error) {
            console.log(error)
        }
    }

    async update(id, body) {
        try {
            const { data, status } = await serviceApi.put('/author/' + id, body)
            return { data, status }
        } catch (error) {
            console.log(error)
        }
    }

    async delete(id) {
        try {
            const { data, status } = await serviceApi.delete('/author/' + id)
            return { data, status }
        } catch (error) {
            console.log(error)
        }
    }



}

export default new AuthorsService()