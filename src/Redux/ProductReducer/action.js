import * as types from "./actionTypes";
import axios from "axios";

export const getProducts = (keyword = "", currentPage = 1, price = [0, 250000], category, ratings = 0) => (dispatch) => {

    dispatch({ type: types.GET_PRODUCT_DATA_REQUEST });
    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${ratings}`;

    if (category || ratings) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${ratings}`;
    }
    return axios.get(link).then((res) => {
        
        dispatch({ type: types.GET_PRODUCT_DATA_SUCCESS, payload: res.data })
    })
        .catch((err) => {
            dispatch({ type: types.GET_PRODUCT_DATA_FAILURE, payload: err })
        })
}


//get Single Product

export const getSingleProduct = (id) => (dispatch) => {
    dispatch({ type: types.GET_SINGLE_PRODUCT_REQUEST });

    return axios.get(`/api/v1/products/${id}`).then((res) => {

        dispatch({ type: types.GET_SINGLE_PRODUCT_SUCCESS, payload: res.data })
    })
        .catch((err) => {

            dispatch({ type: types.GET_SINGLE_PRODUCT_FAILURE, payload: err })
        })
}
// get all admin product
export const getAllAdminProducts = (token) => (dispatch) => {
    dispatch({ type: types.GET_ADMIN_PRODUCTS_REQUEST });
    const config = {
        headers: {
            "authorization": `Bearer ${token}`,
        },
    }

    return axios.get("/api/v1/admin/products", config).then((res) => {
        dispatch({ type: types.GET_ADMIN_PRODUCTS_SUCCESS, payload: res.data })
    }).catch((err) => {
        dispatch({ type: types.GET_ADMIN_PRODUCTS_FAILURE, payload: err })
    })

}


// delete product 

export const deleteProduct = (id, token) => (dispatch) => {
    dispatch({ type: types.DELETE_PRODUCT_REQUEST })
    const config = {
        headers: {
            "authorization": `Bearer ${token}`,
        },
    }
    return axios.delete(`/api/v1/admin/products/${id}`, config).then((res) => {

        dispatch({ type: types.DELETE_PRODUCT_SUCCESS, payload: res.data })
        return types.DELETE_PRODUCT_SUCCESS;
    })
        .catch((err) => {
            dispatch({ type: types.DELETE_PRODUCT_FAILURE, payload: err })
        })

}

// update product

export const updateProduct = (id, payload, token) => (dispatch) => {

    dispatch({ type: types.UPDATE_PRODUCT_REQUEST });
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "authorization": `Bearer ${token}`,
        },
    }
    return axios.patch(`/api/v1/admin/product/${id}`, payload, config).then((res) => {
        dispatch({ type: types.UPDATE_PRODUCT_SUCCESS, payload: res.data })
        return types.UPDATE_PRODUCT_SUCCESS;
    })
        .catch((err) => {
            dispatch({ type: types.UPDATE_PRODUCT_FAILURE, payload: err })
        })

}

//create new product
export const createNewProduct = (payload, token) => (dispatch) => {

    dispatch({ type: types.CREATE_NEW_PRODUCT_REQUEST });
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            "authorization": `Bearer ${token}`,
        },
    }
    return axios.post("/api/v1/admin/product/new", payload, config).then((res) => {
        dispatch({ type: types.CREATE_NEW_PRODUCT_SUCCESS, payload: res.data })
        return types.CREATE_NEW_PRODUCT_SUCCESS
    })
        .catch((err) => {
            dispatch({ type: types.CREATE_NEW_PRODUCT_FAILURE, payload: err })
        })

}
