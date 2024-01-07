import axios from "../api/api"

export async function getFollowingCommunities(){
    try {
        const response = await axios.get(`/community/following`, {
            credentials: 'include'
        })
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function createCommunity(communityName, communityDescription){
    try {
        const response =  await axios.post(`/community`, {
            communityName,
            communityDescription,
        }, {credentials: 'include'})
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}