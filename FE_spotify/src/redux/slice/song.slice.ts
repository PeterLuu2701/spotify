import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    songLists : [],
    songGenre: []
}

const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        setAllSongs: (state, { payload }) => {
            state.songLists = payload
        },
        setAllGenre: (state, { payload }) => {
            state.songGenre = payload
        }
    }
})

export const songAction = songSlice.actions
export default songSlice