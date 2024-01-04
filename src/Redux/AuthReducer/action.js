import * as types from "./actionTypes";
import axios from "axios";

export const loginUser = (payload) => (dispatch) => {
    dispatch({ type: types.USER_LOGIN_REQUEST })

    return axios.post("/api/v1/login", payload).then((res) => {
        dispatch({ type: types.USER_LOGIN_SUCCESS, payload: res.data })
        return types.USER_LOGIN_SUCCESS;
    }).catch((err) => {
            dispatch({ type: types.USER_LOGIN_FAILURE, payload: err })
        })
}

export const registerUser = (payload) => (dispatch) => {
    dispatch({ type: types.USER_SIGNUP_REQUEST })
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    return axios.post("/api/v1/register", payload, config).then((res) => {
        dispatch({ type: types.USER_SIGNUP_SUCCESS, payload: res.data })
        return types.USER_SIGNUP_SUCCESS;
    })
        .catch((err) => {
            dispatch({ type: types.USER_SIGNUP_FAILURE, payload: err })
        })
}


export const userInformation = (token) => (dispatch) => {
    dispatch({ type: types.LOAD_USER_REQUEST })
    const config = {
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    }
    return axios.get("/api/v1/me", config).then((res) => {
        
        dispatch({ type: types.LOAD_USER_SUCCESS, payload: res.data })

    })
        .catch((err) => {
            dispatch({ type: types.LOAD_USER_FAILURE, payload: err })
        })
}

export const userLogout = () => (dispatch) => {
    dispatch({ type: types.USER_LOGOUT_REQUEST })

    return axios.get("/api/v1/logout").then((res) => {
        dispatch({ type: types.USER_LOGOUT_SUCCESS })
        return types.USER_LOGOUT_SUCCESS
    })
        .catch((err) => {
            dispatch({ type: types.USER_LOGIN_FAILURE })
        })
}