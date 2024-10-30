import { ResponseApi } from "../types/typeResponseApi";
import { TypeUser } from "../types/typeUser";
import api from "./apiUtil";

export const apiDetailArtists = async (id: any) => {
    try {
        const response = await api.get<ResponseApi<TypeUser>>(`/find-user/${id}`)
        return response.data.content
    } catch (error: any) {
        throw new Error(error)
    }
}