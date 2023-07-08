import axios from '../api/api'

// import api from '../api/api'
// export async function getUser(){
//     return new Promise((resolve, reject) => {
//         api.get(`/user`, {
//             credentials: 'include'
//         })
//         .then((res) => {
//             console.log("NOERR")
//             resolve(res.data)
//         })
//         .catch((err) => {
//             console.log("ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRR")
//             reject(err)
//         })

//     });
// }
export async function getUser(){
    try {
        const response = await axios.get(`/user`, {
                credentials: 'include'
            })
        return response.data
    } catch (error) {
        return error
    }
}

export async function registerUser(username, password){
    try{
        const response = await axios.post(`/user/register`,{
            username,
            password
        } ,{
            credentials: 'include'
        })
        return response.data
    }catch (error) {
        return Promise.reject(error)
    }
}