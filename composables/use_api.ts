import axios from 'axios'

// Обёртка над axios
export const use_api = () => {

    const axios_instance = axios.create()

    const response_func = async (url: string, method: string, body?: any) => {
        try {
            const response =
                method !== 'get'
                    ? await axios_instance[method](url, body)
                    : await axios_instance[method](url, { params: body })
            return response.data
        } catch (e) {
            console.error(e)
            return e.response.data
        }
    }
    const get = async (url: string, params?: any) => {
        return await response_func(url, 'get', params)
    }
    const post = async (url: string, body?: any) => {
        return await response_func(url, 'post', body)
    }
    const patch = async (url: string, body?: any) => {
        return await response_func(url, 'patch', body)
    }
    const del = async (url: string, body?: any) => {
        return await response_func(url, 'delete', body)
    }
    const put = async (url: string, body?: any) => {
        return await response_func(url, 'put', body)
    }
    return {
        get: get,
        post: post,
        patch: patch,
        delete: del,
        put: put,
    }
}
