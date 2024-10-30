import api from "./apiUtil";

export const apiGetFollow = async (idUser:any, idIsFollow:any)=>{
    try {
        const response = await api.get(`is-following?userId=${idUser}&followingUserId=${idIsFollow}`)
        return response.data.content

    } catch (error) {
        
    }
}