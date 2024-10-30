import api from "./../apiUtil";
import { TypePlaylistPost } from "./../../types/typePlaylist";
import { playlistAction } from "../../redux/slice/playlist.slice";
import { AppDispatch } from './../../redux/store';

export const createPlayList = (data: TypePlaylistPost) => async (dispatch: AppDispatch) => {
    try {
        const response = await api.post('/create-playlist', data);
        dispatch(playlistAction.setPlayList(response.data.content));
        return response.data.content;
    } catch (error) {
        console.error("Error creating playlist:", error);
        return undefined;
    }
};


