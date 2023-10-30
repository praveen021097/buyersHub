import * as types from "./actionTypes";
import axios from "axios";

export const updateProfile = (payload,token) => (dispatch) =>{
            dispatch({type:types.UPDATE_PROFILE_REQUEST})
            console.log("payload",payload)
            const config = {
                    headers:{
                        "Content-Type" : 'multipart/form-data',
                        "authorization":`Bearer ${token}`,
                    },
            }
            return axios.put("/api/v1/me/update",payload,config).then((res)=>{
                dispatch({type:types.UPDATE_PROFILE_SUCCESS,payload:res.data})
                return types.UPDATE_PROFILE_SUCCESS
            })
            .catch((err)=>{
                dispatch({type:types.UPDATE_PROFILE_FAILURE,payload:err})
            })
}

export const updatePassword =(payload,token)=>(dispatch)=>{
            dispatch({type:types.UPDATE_PASSWORD_REQUEST})
            const config = {
                headers:{
                    "Content-Type" : 'application/json',
                    "authorization":`Bearer ${token}`,
                },
        }
            return axios.put("/api/v1/password/update",payload,config).then((res)=>{
                dispatch({type:types.UPDATE_PASSWORD_SUCCESS,payload:res.data})
                return types.UPDATE_PASSWORD_SUCCESS
            })
            .catch((err)=>{
                dispatch({type:types.UPDATE_PASSWORD_FAILURE,payload:err})
            })
}
