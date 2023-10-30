import * as types from "./actionTypes";
import axios from "axios";

export const addProductToCart = (id,quantity) => (dispatch) =>{
    console.log("product added successfully",id,quantity)
    dispatch({type:types.ADD_PRODUCT_IN_CART_REQUEST});
    return axios.get(`/api/v1/products/${id}`).then((res)=>{
        console.log(res.data,"sdshd")
        dispatch({type:types.ADD_PRODUCT_IN_CART_SUCCESS,payload:{
            product: res.data._id,
            name: res.data.name,
            price: res.data.price,
            image: res.data.images[0].url,
            stock: res.data.stocks,
            quantity,
        }})
    

    }).catch((err)=>{
        dispatch({type:types.ADD_PRODUCT_IN_CART_FAILURE,payload:err})
    })

}
