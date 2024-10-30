import { ResponseApi } from "../types/typeResponseApi";
import { TypeSong } from "../types/typeSong";
import api from "./apiUtil";

export const apiGetSongById = async (id: any) => {
    try {
        const response = await api.get<ResponseApi<TypeSong>>(`/find-song/${id}`)
        return response.data.content
    } catch (error: any) {
        throw new Error(error)
    }
}