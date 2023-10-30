import React from 'react'
import {Routes,Route} from "react-router-dom";
import HomePage from './Home/HomePage';
import ProductDetails from './ProductDetails/ProductDetails';
import Products from './Products/Products';
import Search from '../components/Search/Search';
import LoginSignup from '../components/User/LoginSignup/LoginSignup';
import RequireAuth from '../components/ProtectedRoute/RequireAuth';
import Profile from '../components/User/userProfile/Profile';
import UpdateUserProfile from '../components/User/UpdateUserProfile/UpdateUserProfile';
import UpdatePassword from '../components/User/UpdatePassword/UpdatePassword';
import ForgotPassword from '../components/User/ForgotPassword/ForgotPassword';
import Cart from './Cart/Cart';
const MainRoutes = () => {
  return (
        <Routes>
            <Route  path='/' element={<HomePage />}/>
            <Route path ="/product/:id" element={<RequireAuth><ProductDetails /></RequireAuth>}  />
            <Route path = "/products" element={<RequireAuth><Products /></RequireAuth>} />
            <Route path = "/products/:keyword" element={<RequireAuth><Products /></RequireAuth>} />
            <Route path = "/searchProducts" element={<Search />} />
            <Route path='/login-signUp' element={<LoginSignup />} />
            <Route path='/me' element={<RequireAuth><Profile /></RequireAuth>} />
           <Route path="/password/update"  element ={<RequireAuth><UpdatePassword /></RequireAuth>} />
            <Route path='/update-profile' element={<RequireAuth><UpdateUserProfile /></RequireAuth>} />
            <Route path='/forgot-password' element={<RequireAuth><ForgotPassword /></RequireAuth>} />
            <Route path='/cart' element={<Cart />} />
        </Routes>
  )
}

export default MainRoutes
