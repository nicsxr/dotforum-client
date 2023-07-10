import axios from "../api/api"

export async function createComment(text, postId=null, parentCommentId=null){
    try {
        const response =  await axios.post(`/comment`, {
            text,
            postId,
            parentCommentId
        }, {credentials: 'include'})
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function getChildCommentsByCommentId(id, page=1, pageSize){
    try {
        const response = await axios.get(`/comment/children?commentId=${id}&page=${page}&pageSize=${pageSize}`, {
            credentials: 'include'
        })
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}