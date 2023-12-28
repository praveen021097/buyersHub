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

//get SingleOrder 

export const getSingleOrder =(id,token)=>(dispatch)=>{
    dispatch({type:types.GET_SINGLE_ORDER_REQUEST});
    const config = {
        headers:{
            "authorization":`Bearer ${token}`,
        },
}
    return axios.get(`/api/v1/order/${id}`,config).then((res)=>{
        dispatch({type:types.GET_SINGLE_ORDER_SUCCESS,payload:res.data})
    })
    .catch((err)=>{
        dispatch({type:types.GET_SINGLE_ORDER_FAILURE,payload:err})
    })

}

//get all  admin users

export const getAllAdminOrders =(token)=>(dispatch)=>{
    dispatch({type:types.GET_ALL_ADMIN_ORDER_REQUEST});
    const config = {
        headers:{
            "authorization":`Bearer ${token}`,
        },
}
    return axios.get("/api/v1/admin/orders",config).then((res)=>{
        dispatch({type:types.GET_ALL_ADMIN_ORDER_SUCCESS,payload:res.data})
    })
    .catch((err)=>{
        dispatch({type:types.GET_ALL_ADMIN_ORDER_FAILURE,payload:err})
    })

}
//  update order status 
export const updateOrderStatus =(id,payload,token)=>(dispatch)=>{
    dispatch({type:types.UPDATE_ADMIN_ORDER_STATUS_REQUEST});
    const config = {
        headers:{
            "authorization":`Bearer ${token}`,
        },
}
    return axios.put(`/api/v1/admin/orders/${id}`,payload,config).then((res)=>{
        dispatch({type:types.UPDATE_ADMIN_ORDER_STATUS_SUCCESS,payload:res.data})
    })
    .catch((err)=>{
        dispatch({type:types.UPDATE_ADMIN_ORDER_STATUS_FAILURE,payload:err})
    })

}
//delete order 

export const deleteOrder =(id,token)=>(dispatch)=>{
    dispatch({type:types.DELETE_ORDER_REQUEST});
    const config = {
        headers:{
            "authorization":`Bearer ${token}`,
        },
}
    return axios.delete(`/api/v1/admin/orders/${id}`,config).then((res)=>{
        dispatch({type:types.DELETE_ORDER_SUCCESS,payload:res.data})
        return types.DELETE_ORDER_SUCCESS;
    })
    .catch((err)=>{
        dispatch({type:types.DELETE_ORDER_FAILURE,payload:err})
    })

}
