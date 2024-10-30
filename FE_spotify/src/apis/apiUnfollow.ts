import api from "./apiUtil";

export const apiUnfollow = async (data: any) => {
    try {
        const response = await api.delete('/unfollow', {
            data: {
                userId: data.userId,
                followingId: data.followingId
            }
        })
        return response.data.content
    } catch (error) {

    }
}