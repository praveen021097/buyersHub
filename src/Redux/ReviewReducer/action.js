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
// get all reviews of products

export const getAllProductReview = (id,token)=>(dispatch)=>{
    dispatch({type:types.GET_ALL_REVIEWS_REQUEST})
    const config ={
        headers:{
            "authorization":`Bearer ${token}`,
        }
    }
    return axios.get(`/api/v1/reviews?productId=${id}`,config).then((res)=>{
        dispatch({type:types.GET_ALL_REVIEWS_SUCCESS,payload:res.data})
    }).catch((err)=>{
        dispatch({type:types.GET_ALL_REVIEWS_FAILURE,payload:err})
    })

}

export const deleteReview = (productId,reviewId,token)=>(dispatch)=>{
    dispatch({type:types.DELETE_REVIEW_REQUEST})
    const config ={
        headers:{
            "authorization":`Bearer ${token}`,
        }
    }

    return axios.delete(`/api/v1/reviews?productId=${productId}&id=${reviewId}`,config).then((res)=>{
        dispatch({type:types.DELETE_REVIEW_SUCCESS,payload:res.data})
        return types.DELETE_REVIEW_SUCCESS;
    }).catch((err)=>{
        dispatch({type:types.DELETE_REVIEW_FAILURE,payload:err})
    })
}