import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({children}) => {
 const {isAuth} = useSelector((state)=>state.AuthReducer);
 const location = useLocation();
 
 if(!isAuth){
    return <Navigate to={"/login-signUp"} state={{from:location}} replace={true} />
 } 
    return children;
}

export default RequireAuth
