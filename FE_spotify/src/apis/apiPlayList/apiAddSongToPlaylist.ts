import api from "./../apiUtil";
import { songAddToPlaylist } from "./../../types/typePlaylist";
import { AppDispatch } from './../../redux/store';
import { getPlaylistById } from "./apiGetPlaylistById";

export const addSongToPlaylist = (data: songAddToPlaylist) => async (dispatch: AppDispatch) => {
    try {
        const response = await api.post('/add-song-to-playlist', data);
        dispatch(getPlaylistById(data.playlistId))
        return response.data.content;
    } catch (error) {
        console.error("Error creating playlist:", error);
        return undefined;
    }
};


