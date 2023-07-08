import axios from '../api/api'

export async function login(username, password){
    try {
        const response = await axios.post(`/auth/login`,{
            username,
            password
        } ,{
            credentials: 'include'
        })
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function logout(){
    try {
        const response = await axios.post(`/auth/logout`)
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}