import api from "./../apiUtil";
import { TypePlaylistPost } from "./../../types/typePlaylist";
import { playlistAction } from "../../redux/slice/playlist.slice";
import { AppDispatch } from './../../redux/store';
import { ResponseApi } from "../../types/typeResponseApi";

export const getPlaylistByUser= (data: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await api.get<ResponseApi<TypePlaylistPost>>(`/get-playlist-of-user?id=${data}`);
        dispatch(playlistAction.getPlaylist(response.data.content));
    } catch (error: any) {
        console.error("Failed to fetch playlist", error);
    }
};