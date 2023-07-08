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