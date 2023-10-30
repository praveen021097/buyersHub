import * as types from "./actionTypes";

const initialState = {
    isLoading :false,
    isError:false,
    isUpdated :false,
}

export const reducer =(state=initialState,action)=>{
    const {type,payload} = action ;
    switch(type){
        case types.UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                isLoading:true,
                isError:false
            }
        case types.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading:false,
                isError:false,
                isUpdated:true,
            }
        case types.UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                isLoading:false,
                isError:true,
            }
            case types.UPDATE_PASSWORD_REQUEST:
                return {
                    ...state,
                    isLoading:true,
                    isError:false
                }
            case types.UPDATE_PASSWORD_SUCCESS:
                return {
                    ...state,
                    isLoading:false,
                    isError:false,
                    isUpdated:true,
                }
            case types.UPDATE_PASSWORD_FAILURE:
                return {
                    ...state,
                    isLoading:false,
                    isError:true,
                }       
        default:
            return state;    
            
    }

}