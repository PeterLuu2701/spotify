import { songAction } from '../redux/slice/song.slice';
import { AppDispatch } from '../redux/store';
import { ResponseApi } from '../types/typeResponseApi';
import { TypeSong } from '../types/typeSong';
import api from './apiUtil';

export const fetchAndSetSongGenre = () => async (dispatch: AppDispatch) => {
    try {
        const response = await api.get(`/get-all-genres`);
        dispatch(songAction.setAllGenre(response.data));
    } catch (error: any) {
        console.error("Failed to fetch songs", error);
    }
};
