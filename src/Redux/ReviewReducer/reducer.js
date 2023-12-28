import * as types from "./actionTypes";

const initialState ={
    isLoading:false,
    isError:false,
    reviews:[],
    
   success:false,
   isDeleted:false
}

export const reducer =(state=initialState,action)=>{
    const {type,payload} = action;

    switch(type){
        case types.ADD_NEW_REVIEW_REQUEST:
            return {
                ...state,
                isLoading:true,
                isError:false,
            }
            case types.ADD_NEW_REVIEW_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isError:false,
                success:payload.success
            }
            case types.ADD_NEW_REVIEW_FAILURE:
            return {
                ...state,
                isLoading:false,
                isError:true,
            }
        case types.GET_ALL_REVIEWS_REQUEST:
            return {
                    ...state,
                    isLoading:true,
                    isError:false,
            }   
        case types.GET_ALL_REVIEWS_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isError:false,
                reviews:payload.reviews
            } 
        case types.GET_ALL_REVIEWS_FAILURE:
            return {
                ...state,
                isLoading:false,
                isError:true,
            } 
        case types.DELETE_REVIEW_REQUEST:
            return {
                ...state,
                isLoading:true,
                isError:false,
                isDeleted:false
            }           
        case types.DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isDeleted:true,
                isError:false
            }  
        case types.DELETE_REVIEW_FAILURE:
            return{
                ...state,
                isLoading:false,
                isError:true,
                isDeleted:false
            }      
        default:
            return state;
    }


}