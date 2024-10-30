import { TypeListFriend } from "../types/typeListFriend"
import { ResponseApi } from "../types/typeResponseApi"
import api from "./apiUtil"

export const apiGetFriend = async (id: any) => {
    try {
        const response = await api.get<ResponseApi<TypeListFriend[]>>(`/get-list-friends/${id}`)
        return response.data.content
    } catch (error) {

    }
}