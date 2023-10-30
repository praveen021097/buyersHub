import * as types from "./actionTypes";

const initialState = {
    isLoading: false,
    isError: false,
    cartItems: [],
    shippingInfo:{}
}

export const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.ADD_PRODUCT_IN_CART_REQUEST:
            return {
                        ...state,
                        isLoading:true,
                        isError:false,
            }
        case types.ADD_PRODUCT_IN_CART_SUCCESS:
            const item = action.payload;
            const isItemExist = state.cartItems.find((i) => i.product === item.product);

            if(isItemExist){
                return {
                        ...state,
                        cartItems:state.cartItems.map((i)=> i.product === isItemExist.product? item : i)
                }
            }
            else{
                return{
                    ...state,
                    cartItems:[...state.cartItems,item]
                }
            }
          
        case types.ADD_PRODUCT_IN_CART_FAILURE:
            return {
                    ...state,
                    isError:true,
                    isLoading:false
            }
        case types.REMOVE_PRODUCT_FROM_CART_SUCCESS:
            return {
                ...state,
                cartItems:state.cartItems.filter((i)=> i.product !== payload),
            } 
        case types.SAVE_PRODUCT_SUCCESS:
            return{
                ...state,
                shippingInfo:payload,
            }       
        default:
            return state;
    }
}