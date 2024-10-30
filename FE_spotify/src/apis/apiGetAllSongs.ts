import { songAction } from '../redux/slice/song.slice';
import { AppDispatch } from '../redux/store';
import { ResponseApi } from '../types/typeResponseApi';
import { TypeSong } from '../types/typeSong';
import api from './apiUtil';

export const fetchAndSetAllSongs = () => async (dispatch: AppDispatch) => {
    try {
        const response = await api.get<ResponseApi<TypeSong>>(`/all-songs`);
        dispatch(songAction.setAllSongs(response.data.content));
    } catch (error: any) {
        console.error("Failed to fetch songs", error);
    }
};
