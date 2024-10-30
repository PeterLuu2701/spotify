import { friendAction } from "../../redux/slice/friend.slice";
import { AppDispatch } from "../../redux/store";
import api from "./../apiUtil";

export const addFriend = (data: any) => async (dispatch : AppDispatch) => {
    try {
        const response = await api.post('/add-friends', data);
        dispatch(friendAction.setFriendList(response.data.content));
        return response.data.content;
    } catch (error) {
        console.error("Error creating playlist:", error);
        return undefined;
    }
};


