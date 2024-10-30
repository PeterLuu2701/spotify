import api from "./apiUtil";

export const apiSendFollow = async (data: any) => {
    try {
        const response = await api.post('/send-follow', data)
        return response.data.content
    } catch (error) {

    }

}