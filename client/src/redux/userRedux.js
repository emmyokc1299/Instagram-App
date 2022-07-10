import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        followings: [],
        isFetching: false,
        error: false,
        log_Modal: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
            state.error = false
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true
        },
        signupStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        signupSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload
        },
        signupFailure: (state) => {
            state.isFetching = false;
            state.error = true
        },
        checkFollow: (state, action) => {
            state.followings = action.payload
        },
        open_logOut: (state, action) => {
            state.log_Modal = action.payload 
        },
        LogOut: (state) => {
            state.currentUser = null
        }

    }
})


export const { loginStart, loginSuccess, loginFailure, signupStart, signupSuccess, signupFailure, checkFollow, open_logOut, LogOut} = userSlice.actions;
export default userSlice.reducer



/** 
 * Find a way to take care of what happens when the jwt that authenticated user actions like posting, liking etc expires and how to make the user login again. Check that Contaxts App from the react-native tutorial or the Memories app tutorial(timestamp: 4hrs-53mins)for references
 * 
 */

/**
 * In future projects if i need to persist data and the only data that is to be persisted is the user data (ie currentUser, token...etc ), instead of using redux persist, i can use the format implememted in the Memories app and Contaxt app tutorials- by using localStorage directly. This will enabel me implement the axios request and response interceptors comfortably.
 */