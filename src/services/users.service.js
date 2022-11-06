import { serviceApi } from '@/axios'

class UsersService {

    async login(body) {
        try {
            const { data, status } = await serviceApi.post('/login', body)
            return { data, status }
        } catch (error) {
            console.log("🚀 ~ file: users.service.js ~ line 10 ~ UsersService ~ login ~ error", error)
        }
    }

}

export default new UsersService()