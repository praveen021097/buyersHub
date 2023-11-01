import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";
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
import ShippingInfo from './Cart/ShippingInfo';
import ConfirmOrder from './Cart/ConfirmOrder';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Payment from './Payment/Payment';
import OrderSuccess from './Cart/OrderSuccess';
import MyOrders from './Orders/MyOrders';
const MainRoutes = () => {
  const { token } = useSelector((state) => state.AuthReducer);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        },
      }
      const { data } = await axios.get("/api/v1/stripeApiKey", config);
      console.log("data", data)
      setStripeApiKey(data.stripeApiKey)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    
      getStripeApiKey()
    
  })
  console.log(stripeApiKey, "stripekey")
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path="/product/:id" element={<RequireAuth><ProductDetails /></RequireAuth>} />
      <Route path="/products" element={<RequireAuth><Products /></RequireAuth>} />
      <Route path="/products/:keyword" element={<RequireAuth><Products /></RequireAuth>} />
      <Route path="/searchProducts" element={<Search />} />
      <Route path='/login-signUp' element={<LoginSignup />} />
      <Route path='/me' element={<RequireAuth><Profile /></RequireAuth>} />
      <Route path="/password/update" element={<RequireAuth><UpdatePassword /></RequireAuth>} />
      <Route path='/update-profile' element={<RequireAuth><UpdateUserProfile /></RequireAuth>} />
      <Route path='/forgot-password' element={<RequireAuth><ForgotPassword /></RequireAuth>} />
      <Route path='/cart' element={<RequireAuth><Cart /></RequireAuth>} />
      <Route path='/shipping' element={<RequireAuth><ShippingInfo /></RequireAuth>} />
      <Route path='/confirm-order' element={<RequireAuth><ConfirmOrder /></RequireAuth>} />
      <Route path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)}><RequireAuth><Payment /></RequireAuth></Elements>} />
      <Route path='/success' element={<RequireAuth><OrderSuccess /></RequireAuth>} />
      <Route path='/orders' element={<RequireAuth><MyOrders /></RequireAuth>} />
    </Routes>
  )
}

export default MainRoutes
