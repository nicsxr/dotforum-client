import axios from '../api/api'


export async function getPostById(id){
    try {
        const response = await axios.get(`/post?id=${id}`, {
            credentials: 'include'
        })
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function getCommentsByPostId(id, page=1){
    try {
        const response = await axios.get(`/post/comments?postId=${id}&page=${page}&pageSize=10`, {
            credentials: 'include'
        })
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function votePost(id, vote){
    try {
        const response =  await axios.post(`/post/vote`, {
            postId: id,
            vote
        }, {credentials: 'include'})
        return response.data
    } catch (error) {
        return Promise.reject(error)
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
        return Promise.reject(error)
    }
}