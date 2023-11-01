import * as types from "./actionTypes";
import axios from "axios";

export const createOrder =(order,token)=>(dispatch)=>{
    console.log("djdjdj",token)
    dispatch({type:types.CREATE_ORDER_REQUEST});
    const config = {
        headers:{
            "Content-Type" : 'application/json',
            "authorization":`Bearer ${token}`,
        },
}
    return axios.post("/api/v1/order/new",order,config).then((res)=>{
        console.log("order sucess")
        dispatch({type:types.CREATE_ORDER_SUCCESS,payload:res.data})
    })
    .catch((err)=>{
        dispatch({type:types.CREATE_ORDER_FAILURE,payload:err})
    })
}

// get Orders 

export const getOrders =(token)=>(dispatch)=>{
    dispatch({type:types.GET_ORDERS_REQUEST});
    const config = {
        headers:{
            "authorization":`Bearer ${token}`,
        },
}
    return axios.get("/api/v1/orders/me",config).then((res)=>{
        console.log(res.data.orders)
        dispatch({type:types.GET_ORDERS_SUCCESS,payload:res.data.orders})
    }).catch((err)=>{
        dispatch({type:types.GET_ORDERS_FAILURE,payload:err})
    })

}