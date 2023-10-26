import * as types from "./actionTypes";
import axios from "axios";

export const getProducts =(keyword="",currentPage=1,price=[0,250000],category,ratings=0)=>(dispatch)=>{
   
    dispatch({type:types.GET_PRODUCT_DATA_REQUEST});
    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${ratings}`;
    console.log("keyword value",link)
    if (category || ratings) {
      link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${ratings}`;
    }
        return axios.get(link).then((res)=>{
            console.log("res.data",res.data)
            dispatch({type:types.GET_PRODUCT_DATA_SUCCESS,payload:res.data})
        })
        .catch((err)=>{
            dispatch({type:types.GET_PRODUCT_DATA_FAILURE,payload:err})
        })
}
