import * as types from "./actionTypes";
import axios from "axios";

export const getProducts =()=>(dispatch)=>{
    dispatch({type:types.GET_PRODUCT_DATA_REQUEST});
        return axios.get("/api/v1/products").then((res)=>{
            dispatch({type:types.GET_PRODUCT_DATA_SUCCESS,payload:res.data.products})
        })
        .catch((err)=>{
            dispatch({type:types.GET_PRODUCT_DATA_FAILURE,payload:err})
        })
}
