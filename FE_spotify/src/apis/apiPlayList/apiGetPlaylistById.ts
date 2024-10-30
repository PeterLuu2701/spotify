import api from "./../apiUtil";
import { playlistAction } from "../../redux/slice/playlist.slice";
import { AppDispatch } from './../../redux/store';

export const getPlaylistById = (data: any) => async (dispatch: AppDispatch) => {
    try {
        const response = await api.get(`/get-playlist-detail/${data}`);       
        dispatch(playlistAction.getPlaylistDetailById(response.data.content));
        return response.data.content;
    } catch (error) {
        console.error("Error creating playlist:", error);
        return undefined;
    }
};


