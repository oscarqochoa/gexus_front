import { serviceApi } from './index';

export function initialize(router) {
    serviceApi.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('accessToken')
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`; // for Laravel or Spring boot application
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    serviceApi.interceptors.response.use(null, (error) => {
        if (error.response.status == 401) {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userData')
            router.push({ name: 'login' })
        }
        return Promise.reject(error);
    })
}