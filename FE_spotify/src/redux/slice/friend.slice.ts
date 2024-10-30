import { createSlice } from "@reduxjs/toolkit"
// import { TypeListFriend } from "../../types/typeListFriend"

const initialState = {
    friendLists: [],
}

const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {
        setFriendList: (state, { payload }) => {
            state.friendLists = payload
        },
    }
})

export const friendAction = friendSlice.actions
export default friendSlice