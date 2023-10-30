import * as types from "./actionTypes";

const initialState = {
    isLoading: false,
    isError: false,
    cartItems: []
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
            console.log("prodsdds",isItemExist)
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
        default:
            return state;
    }
}