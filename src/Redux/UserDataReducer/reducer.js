import * as types from "./actionTypes";

const initialState = {
   
        isLoading: false,
        isError: false,
        users: [],
        user: {},
        isDeleted: false,
        isUpdated: false,

}

export const reducer =(state=initialState,action)=>{
    const {type,payload} = action ;
    switch(type){
        case types.UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                isLoading:true,
                isError:false,
                isUpdated:false
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
                    isUpdated:false
                }
                case types.GET_ALL_USERS_REQUEST:
                    return {
                        ...state,
                        isLoading: true,
                        isError: false,
                    }
                case types.GET_ALL_USERS_SUCCESS:
                    return {
                        ...state,
                        isLoading: false,
                        isError: false,
                        users: payload
                    }
                case types.GET_ALL_USERS_FAILURE:
                    return {
                        ...state,
                        isLoading: false,
                        isError: true,
                    }
                case types.GET_SINGLE_USER_REQUEST:
                    return {
                        ...state,
                        isLoading: true,
                        isError: false,
                    }
                case types.GET_SINGLE_USER_SUCCESS:
                    return {
                        ...state,
                        isLoading: false,
                        isError: false,
                        user: payload
                    }
                case types.GET_SINGLE_USER_FAILURE:
                    return {
                        ...state,
                        isLoading: false,
                        isError: true,
                    }
                case types.DELETE_USER_REQUEST:
                    return {
                        ...state,
                        isLoading: true,
                        isError: false,
                        isDeleted:false
                    }
                case types.DELETE_USER_SUCCESS:
                    return {
                        ...state,
                        isLoading: false,
                        isError: false,
                        isDeleted:true
                    }
                case types.DELETE_USER_FAILURE:
                    return {
                        ...state,
                        isLoading: false,
                        isError: true,
                        isDeleted:false
                    }
        
                    case types.UPDATE_USER_REQUEST:
                        return {
                            ...state,
                            isLoading: true,
                            isError: false,
                            isUpdated:false
                        }
                    case types.UPDATE_USER_SUCCESS:
                        return {
                            ...state,
                            isLoading: false,
                            isError: false,
                            isUpdated:true
                        }
                    case types.UPDATE_USER_FAILURE:
                        return {
                            ...state,
                            isLoading: false,
                            isError: true,
                            isUpdated:false
                        }       
        default:
            return state;    
            
    }

}