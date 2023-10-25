import * as types from "./actionTypes";
import axios from "axios";

export const getProducts =(keyword="",currentPage=1,price=[0,250000])=>(dispatch)=>{
    console.log("keyword value",keyword)
    dispatch({type:types.GET_PRODUCT_DATA_REQUEST});
        return axios.get(`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`).then((res)=>{
            console.log("res.data",res.data)
            dispatch({type:types.GET_PRODUCT_DATA_SUCCESS,payload:res.data})
        })
        .catch((err)=>{
            dispatch({type:types.GET_PRODUCT_DATA_FAILURE,payload:err})
        })
}
