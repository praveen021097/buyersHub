import { getProducts } from "../ProductReducer/action";
import * as types from "./actionTypes";
import axios from "axios";


export const addNewReview =(payload,token)=>(dispatch)=>{
    dispatch({type:types.ADD_NEW_REVIEW_REQUEST})
    const config ={
        headers:{
                "Content-Type":"application/json",
                "authorization":`Bearer ${token}`,
        },
    }
    return axios.put("/api/v1/review",payload,config).then((res)=>{
       
        dispatch({type:types.ADD_NEW_REVIEW_SUCCESS,payload:res.data})
        getProducts();
    })
    .catch((err)=>{
        dispatch({type:types.ADD_NEW_REVIEW_FAILURE,payload:err})
    })

}