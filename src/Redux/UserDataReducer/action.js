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

// get all users
export const getAllUsers = (token)=>(dispatch)=>{
    dispatch({type:types.GET_ALL_USERS_REQUEST});
    const config = {
        headers:{
            "authorization":`Bearer ${token}`,
        }
    };
    return axios.get("/api/v1/admin/users",config).then((res)=>{
        dispatch({type:types.GET_ALL_USERS_SUCCESS,payload:res.data})
    })
    .catch((err)=>{
        dispatch({type:types.GET_ALL_USERS_FAILURE,payload:err})
    })
}

// get single user

export const getSingleUser = (id,token)=>(dispatch)=>{
    dispatch({type:types.GET_SINGLE_USER_REQUEST});
    const config = {
        headers:{
            "authorization":`Bearer ${token}`,
        }
    };
    console.log("token",token)
    return axios.get(`/api/v1/admin/users/${id}`,config).then((res)=>{

        dispatch({type:types.GET_SINGLE_USER_SUCCESS,payload:res.data})
    })
    .catch((err)=>{
        dispatch({type:types.GET_SINGLE_USER_FAILURE,payload:err})
    })
}

// delete user

export const deleteUser = (id,token)=>(dispatch)=>{
    dispatch({type:types.DELETE_USER_REQUEST});
    const config = {
        headers:{
            "authorization":`Bearer ${token}`,
        }
    };
    return axios.delete(`/api/v1/admin/users/${id}`,config).then((res)=>{
        console.log("deleted")
        dispatch({type:types.DELETE_USER_SUCCESS,payload:res.data})
    })
    .catch((err)=>{
        dispatch({type:types.DELETE_USER_FAILURE,payload:err})
    })
}

// update user
export const updateUser = (id,token,payload)=>(dispatch)=>{
    dispatch({type:types.UPDATE_USER_REQUEST});
    const config = {
        headers:{
            "Content-Type":"application/json",
            "authorization":`Bearer ${token}`,
        }
    };
    return axios.patch(`/api/v1/users/${id}`,config,payload).then((res)=>{
        dispatch({type:types.UPDATE_USER_SUCCESS,payload:res.data})
    })
    .catch((err)=>{
        dispatch({type:types.UPDATE_USER_FAILURE,payload:err})
    })
}

//update user role

export const updateUserRole = (id,token,payload)=>(dispatch)=>{
    dispatch({type:types.UPDATE_USER_ROLE_REQUEST});
    const config = {
        headers:{
            "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json",
        }
    };
  console.log("tokenrole",token)
    return axios.post(`/api/v1/admin/update/role/${id}`,config,payload).then((res)=>{
 
        dispatch({type:types.UPDATE_USER_ROLE_SUCCESS,payload:res.data})
    })
    .catch((err)=>{
        console.log("hi")
        dispatch({type:types.UPDATE_USER_ROLE_FAILURE,payload:err})
    })
}