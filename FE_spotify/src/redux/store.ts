import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/user.slice";
import songSlice from "./slice/song.slice";
import playlistSlice from "./slice/playlist.slice";
import friendSlice from "./slice/friend.slice";

const rootReducer = combineReducers({
    currentUser: userSlice.reducer,
    song: songSlice.reducer,
    playlist: playlistSlice.reducer,
    friend: friendSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefauldMiddlware => getDefauldMiddlware())
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch