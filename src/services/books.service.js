import { serviceApi } from '@/axios'

class BooksService {

    async getBooks(params) {
        try {
            const { data, status } = await serviceApi.get('/book/list', {
                params: params
            })
            return { data, status }
        } catch (error) {
            console.log(error)
        }
    }

    async getBook(id) {
        try {
            const { data, status } = await serviceApi.get('/book/show/' + id)
            return { data, status }
        } catch (error) {
            console.log(error)
        }
    }

    async register(body) {
        try {
            const { data, status } = await serviceApi.post('/book/', body)
            return { data, status }
        } catch (error) {
            console.log(error)
        }
    }

    async update(id, body) {
        try {
            const { data, status } = await serviceApi.put('/book/' + id, body)
            return { data, status }
        } catch (error) {
            console.log(error)
        }
    }

    async delete(id) {
        try {
            const { data, status } = await serviceApi.delete('/book/' + id)
            return { data, status }
        } catch (error) {
            console.log(error)
        }
    }



}

export default new BooksService()