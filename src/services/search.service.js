import axios from '../api/api'


export async function Search(searchWord){
    return new Promise((resolve, reject) => {
        axios.get(`/search?SearchWord=${searchWord}`).catch((err) => {
            reject(err)
        }).then((res) => {
            resolve(res.data)
        })
    });
}