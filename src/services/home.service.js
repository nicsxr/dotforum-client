import axios from '../api/api'


export async function getPublicHome(page=1){
    return new Promise((resolve, reject) => {
        axios.get(`/home/public?page=${page}&pageSize=10`).catch((err) => {
            reject(err)
        }).then((res) => {
            resolve(res.data)
        })
    });
}