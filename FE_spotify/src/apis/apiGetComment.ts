import { TypeComment } from "../types/typeComment";
import { ResponseApi } from "../types/typeResponseApi";
import api from "./apiUtil";

export const apiGetComment = async (id: any) => {
    try {
        const response = await api.get<ResponseApi<TypeComment[]>>(`/find-discuss/${id}`)
        return response.data.content
    } catch {

    }
}