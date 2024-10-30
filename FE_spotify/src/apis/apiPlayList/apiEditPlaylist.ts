import api from "./../apiUtil";
import { playlistUpdate } from "./../../types/typePlaylist";
import { AppDispatch } from './../../redux/store';
import { getPlaylistById } from "./apiGetPlaylistById";

export const editPlaylist = (id:number, data: playlistUpdate) => async (dispatch: AppDispatch) => {
    try {
        const response = await api.put(`/edit-playlist/${id}`, data);
        dispatch(getPlaylistById(id))
        return response.data.content;
    } catch (error) {
        console.error("Error update playlist:", error);
        return undefined;
    }
};


