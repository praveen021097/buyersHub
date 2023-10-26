import * as types from "./actionTypes";
import axios from "axios";

export const loginUser = (payload)=>(dispatch)=>{
    dispatch({type:types.USER_LOGIN_REQUEST})

    return axios.post("/api/v1/login",payload).then((res)=>{
        dispatch({type:types.USER_LOGIN_SUCCESS,payload:res.data})
        return types.USER_LOGIN_SUCCESS;
    })
    .catch((err)=>{
        dispatch({type:types.USER_LOGIN_FAILURE,payload:err})
    })
}

export const registerUser = (payload)=>(dispatch)=>{
    dispatch({type:types.USER_SIGNUP_REQUEST})
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    return axios.post("/api/v1/register",payload,config).then((res)=>{
        dispatch({type:types.USER_SIGNUP_SUCCESS,payload:res.data})
        return types.USER_SIGNUP_SUCCESS;
    })
    .catch((err)=>{
        dispatch({type:types.USER_SIGNUP_FAILURE,payload:err})
    })
}

