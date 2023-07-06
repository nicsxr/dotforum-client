import axios from '../api/api'

export async function login(username, password){
    return new Promise((resolve, reject) => {
        axios.post(`/auth/login`,{
            username,
            password
        } ,{
            credentials: 'include'
        }).catch((err) => {
            reject(err)
        }).then((res) => {
            resolve(res.data)
        })
    });
}