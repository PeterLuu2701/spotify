import { ResponseApi } from "../types/typeResponseApi";
import { TypeUser } from "../types/typeUser";
import api from "./apiUtil";

export const apiGetUser = async () => {
    try {
        const response = await api.get<ResponseApi<TypeUser>>('/all-users')
        return response.data.content
    } catch (error: any) {
        throw new Error(error)
    }
}