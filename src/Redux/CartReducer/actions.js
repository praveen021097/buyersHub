import * as types from "./actionTypes";
import axios from "axios";



export const addProductToCart = (id,quantity) => (dispatch,getState) =>{
    
    dispatch({type:types.ADD_PRODUCT_IN_CART_REQUEST});
    return axios.get(`/api/v1/products/${id}`).then((res)=>{
        
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

export const removeItemsFromCart =(id)=>(dispatch,getState)=>{
    dispatch({type:types.REMOVE_PRODUCT_FROM_CART_SUCCESS,payload:id})
 
}

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type: types.SAVE_PRODUCT_SUCCESS,
      payload: data,
    });
  
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };