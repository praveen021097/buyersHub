
import * as types from "./actionTypes"

const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    productsCount: 0,
    totalPages: 0,
    resultPerPage: 0,
    filterProductCount: 0,
    singleProduct: {},
    isDeleted:false,
    isEdited:false,
    isCreated:false,
};

export const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.GET_PRODUCT_DATA_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case types.GET_PRODUCT_DATA_SUCCESS:
            return {
                ...state,
                products: payload.products,
                isLoading: false,
                isError: false,
                productsCount: payload.totalProducts,
                totalPages: payload.totalPages,
                resultPerPage: payload.resultPerPage,
                filterProductCount: payload.filterProductCount
            }
        case types.GET_PRODUCT_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case types.GET_SINGLE_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case types.GET_SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                singleProduct: payload

            }
        case types.GET_SINGLE_PRODUCT_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case types.GET_ADMIN_PRODUCTS_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            }
        case types.GET_ADMIN_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                products:payload

            }
        case types.GET_ADMIN_PRODUCTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case types.DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading:true,
                isError:false,
                isDeleted:false,
            }
        case types.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isError:false,
                isDeleted:payload.isDeleted,
            }     
       case types.DELETE_PRODUCT_FAILURE:
        return {
            ...state,
                isLoading:false,
                isError:true,
                isDeleted:false,
        } 
        case types.UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading:true,
                isError:false,
                isEdited:false,
            }
        case types.UPDATE_PRODUCT_SUCCESS:
                return {
                    ...state,
                    isEdited:true,
                    isLoading:false,
                    isError:false,
                }  
        case types.UPDATE_PRODUCT_FAILURE:
            return {
                ...state,
                isEdited:false,
                isLoading:false,
                isError:false,
            } 
            
            case types.CREATE_NEW_PRODUCT_REQUEST:
                return {
                    ...state,
                    isLoading:true,
                    isError:false,
                    isCreated:false,
                }
            case types.CREATE_NEW_PRODUCT_SUCCESS:
                return {
                    ...state,
                    isLoading:false,
                    isError:false,
                    isCreated:true,
                }     
           case types.CREATE_NEW_PRODUCT_FAILURE:
            return {
                ...state,
                    isLoading:false,
                    isError:true,
                    isCreated:false,
            } 
        default:
            return state
    }
}