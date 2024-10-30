import { createSlice } from "@reduxjs/toolkit"
import { PlaylistDetail } from "../../types/typePlaylist"

const initialState = {
    playLists: [],
    playListAdd : [],
    playListDetailById: <PlaylistDetail>{}
}

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        setPlayList: (state, { payload }) => {
            state.playListAdd = payload
        },
        getPlaylist: (state, { payload }) => {
            state.playLists = payload
        },
        getPlaylistDetailById:(state, { payload }) => {
            state.playListDetailById = payload
        }
    }
})

export const playlistAction = playlistSlice.actions
export default playlistSlice