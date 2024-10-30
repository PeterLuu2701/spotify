import api from "./apiUtil";

export const apiLogin = async (account: any) => {
    try {
        const response = await api.post('/login', account)
        return response.data.content
    } catch (error: any) {
        throw new Error(error)
    }
}
