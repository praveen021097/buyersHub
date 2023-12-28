import * as types from "./actionTypes";

const initialState = {
    orders: [],
    orderStatus: {},
    singleOrder:{},
    isLoading: false,
    isError: false,
    isUpdated:false,
    isDeleted:false,
}

export const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.CREATE_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case types.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                orderStatus: payload,
                isLoading: false,
                isError: false,
            }

        case types.CREATE_ORDER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }

        case types.GET_ORDERS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case types.GET_ORDERS_SUCCESS:
            return {
                ...state,
                orders: payload,
                isLoading: false,
                isError: false,
            }

        case types.GET_ORDERS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }

            case types.GET_SINGLE_ORDER_REQUEST:
                return {
                    ...state,
                    isLoading: true,
                    isError: false,
                }
            case types.GET_SINGLE_ORDER_SUCCESS:
                return {
                    ...state,
                    singleOrder: payload.order,
                    isLoading: false,
                    isError: false,
                }
    
            case types.GET_SINGLE_ORDER_FAILURE:
                return {
                    ...state,
                    isLoading: false,
                    isError: true,
                }

                case types.GET_ALL_ADMIN_ORDER_REQUEST:
                    return {
                        ...state,
                        isLoading: true,
                        isError: false,
                    }
                case types.GET_ALL_ADMIN_ORDER_SUCCESS:
                    return {
                        ...state,
                        orders: payload.orders,
                        isLoading: false,
                        isError: false,
                    }
        
                case types.GET_ALL_ADMIN_ORDER_FAILURE:
                    return {
                        ...state,
                        isLoading: false,
                        isError: true,
                    }   
                    
                    case types.DELETE_ORDER_REQUEST:
                        return {
                            ...state,
                            isDeleted:false,
                            isLoading: true,
                            isError: false,
                        }
                    case types.DELETE_ORDER_SUCCESS:
                        return {
                            ...state,
                            isDeleted:true,
                            isLoading: false,
                            isError: false,
                        }
            
                    case types.DELETE_ORDER_FAILURE:
                        return {
                            ...state,
                            isDeleted:false,
                            isLoading: false,
                            isError: true,
                        } 

                        case types.UPDATE_ADMIN_ORDER_STATUS_REQUEST:
                        return {
                            ...state,
                            isUpdated:false,
                            isLoading: true,
                            isError: false,
                        }
                    case types.UPDATE_ADMIN_ORDER_STATUS_SUCCESS:
                        return {
                            ...state,
                            isUpdated:true,
                            isLoading: false,
                            isError: false,
                        }
            
                    case types.UPDATE_ADMIN_ORDER_STATUS_FAILURE:
                        return {
                            ...state,
                            isUpdated:false,
                            isLoading: false,
                            isError: true,
                        }

        default:
            return state;
    }

}