import * as types from "./actionTypes";

const initialState ={
    orders:[],
    orderStatus:{},
    isLoading:false,
    isError:false,
}

export const reducer =(state=initialState,action)=>{
        const {type,payload}=action;

        switch(type){
            case types.CREATE_ORDER_REQUEST:
                return {
                    ...state,
                    isLoading:true,
                    isError:false,
                }
                case types.CREATE_ORDER_SUCCESS:
                return {
                    ...state,
                    orderStatus:payload,
                    isLoading:false,
                    isError:false,
                }

                case types.CREATE_ORDER_FAILURE:
                    return {
                        ...state,
                        isLoading:false,
                        isError:true,
                    }

                    case types.GET_ORDERS_REQUEST:
                        return {
                            ...state,
                            isLoading:true,
                            isError:false,
                        }
                        case types.GET_ORDERS_SUCCESS:
                        return {
                            ...state,
                            orders:payload,
                            isLoading:false,
                            isError:false,
                        }
        
                        case types.GET_ORDERS_FAILURE:
                            return {
                                ...state,
                                isLoading:false,
                                isError:true,
                            }

            default:
                return state;
        }

}