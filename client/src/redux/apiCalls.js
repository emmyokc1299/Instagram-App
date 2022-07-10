import { loginFailure, loginStart, loginSuccess, signupFailure, signupStart, signupSuccess } from "./userRedux";

import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
    // console.log('just checking')
    dispatch(loginStart())
    try {
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data))
    } catch (err) {
        dispatch(loginFailure())
    }  
} 

export const signup = async (dispatch, user) => {
    dispatch(signupStart())
    try {
        const res = await publicRequest.post("/auth/signup", user)
        dispatch(signupSuccess(res.data))
    } catch (err) {
        dispatch(signupFailure())
    }
}

export const makePost = async (post) => {
    try {
        const res = await userRequest.post("/post/", post)
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
} 
