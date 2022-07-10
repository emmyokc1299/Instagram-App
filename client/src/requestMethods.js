import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"

const user = localStorage !== null && JSON.stringify(JSON.parse(localStorage.getItem("persist:root"))) 

const currentUser = user && JSON.parse(user)?.currentUser

const TOKEN =  currentUser && JSON.parse(currentUser)?.accessToken

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`}
})


