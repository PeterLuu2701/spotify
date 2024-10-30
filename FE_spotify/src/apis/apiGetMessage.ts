import api from "./apiUtil";

export const apiGetMessage = async (roomChat: string) => {
    try {
        const response = await api.get(`/messages/byRoom?roomChat=${roomChat}`)
        return response.data.content
    } catch (error) {

    }
}