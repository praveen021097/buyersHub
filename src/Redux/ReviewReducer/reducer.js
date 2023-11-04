import * as types from "./actionTypes";

const initialState ={
    isLoading:false,
    isError:false,
   success:false
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
        default:
            return state;
    }


}