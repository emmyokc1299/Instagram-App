import {createSlice} from "@reduxjs/toolkit"

const postSlice = createSlice({
    name: "post",
    initialState: {
        postModal: false,
        postOptions: false,
        postEdit: false,
        post: [],
        postDetails: {}
    },

    reducers: {
        show_postModal: (state, action) => {
            state.postModal = action.payload
        },
        show_postOptions: (state, action) => {
            state.postOptions = action.payload
        },
        show_postEdit: (state, action) => {
            state.postEdit = action.payload
        },
        create_post: (state, action) => {
            // state.post.push(action.payload)
            state.post = [...state.post, action.payload]
        },
        send_postDetails: (state, action) => {
            state.postDetails = action.payload
        }
    }
})

export const {show_postModal, show_postOptions, show_postEdit, create_post, send_postDetails} = postSlice.actions

export default postSlice.reducer