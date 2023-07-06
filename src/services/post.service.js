import axios from '../api/api'


export async function getPostById(id){
    return new Promise((resolve, reject) => {
        axios.get(`/post?id=${id}`, {
            credentials: 'include'
        }).catch((err) => {
            reject(err)
        }).then((res) => {
            resolve(res.data)
        })
    });
}

export async function votePost(id, vote){
    try {
        const response =  await axios.post(`/post/vote`, {
            postId: id,
            vote
        }, {credentials: 'include'})
        return response.data
    } catch (error) {
        return error
    }
}
export async function createPost(title, body, communityId){
    try {
        const response =  await axios.post(`/post`, {
            title,
            body,
            communityId
        }, {credentials: 'include'})
        return response.data
    } catch (error) {
        return error
    }
}