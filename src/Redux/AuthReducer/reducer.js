import * as types from "./actionTypes";

const initialState = {
    isLoading: false,
    isError: false,
    token: JSON.parse(localStorage.getItem("token")) || "",
    userDetails: {},
    isAuth: false
}

export const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.USER_LOGIN_REQUEST:
            return {
                ...state,
                isAuth: false,
                isLoading: true,
                isError: false
            }
        case types.USER_LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                isAuth: true,
                isLoading: false,
                isError: false,
                token: payload.token,
                userDetails: payload.user
            }
        case types.USER_LOGIN_FAILURE:
            return {
                ...state,
                isAuth: false,
                isLoading: false,
                isError: true
            }

        case types.USER_SIGNUP_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case types.USER_SIGNUP_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                isLoading: false,
                isError: false,
                token: payload.token,
                userDetails: payload.user
            }
        case types.USER_SIGNUP_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case types.LOAD_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case types.LOAD_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                token: payload.token,
                userDetails: payload.user
            }
        case types.LOAD_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        case types.USER_LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case types.USER_LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            return {
                ...state,
                isLoading: false,
                isError: false,
                isAuth: false,

            }
        case types.USER_LOGOUT_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            return state;
    }

}