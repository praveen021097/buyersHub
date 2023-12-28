import React, { useEffect, useState } from 'react'
import { Routes, Route} from "react-router-dom";
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
import OrderDetails from './Orders/OrderDetails';
import Dashboard from './AdminDashboard/Dashboard';
import AllProducts from './AdminDashboard/AllProducts';
import NewProduct from './AdminDashboard/NewProduct';
import UpdateProduct from './AdminDashboard/UpdateProduct';
import OrderList from './AdminDashboard/OrderList';
import UpdateOrderStatus from './AdminDashboard/UpdateOrderStatus';
import UserList from './AdminDashboard/UserList';
import UpdateUser from './AdminDashboard/UpdateUser';
import Reviews from './AdminDashboard/Reviews';
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
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:keyword" element={<Products />} />
      <Route path="/searchProducts" element={<Search />} />
      <Route path='/login-signUp' element={<LoginSignup />} />
      <Route path='/me' element={<RequireAuth><Profile /></RequireAuth>} />
      <Route path="/password/update" element={<RequireAuth><UpdatePassword /></RequireAuth>} />
      <Route path='/update-profile' element={<RequireAuth><UpdateUserProfile /></RequireAuth>} />
      <Route path='/forgot-password' element={<RequireAuth><ForgotPassword /></RequireAuth>} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/shipping' element={<RequireAuth><ShippingInfo /></RequireAuth>} />
      <Route path='/confirm-order' element={<RequireAuth><ConfirmOrder /></RequireAuth>} />
      <Route path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)}><RequireAuth><Payment /></RequireAuth></Elements>} />
      <Route path='/success' element={<RequireAuth><OrderSuccess /></RequireAuth>} />
      <Route path='/orders' element={<RequireAuth><MyOrders /></RequireAuth>} />
      <Route path='/orders/:id' element={<RequireAuth><OrderDetails /></RequireAuth>} />
      <Route path='/admin/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path='/admin/products' element={<RequireAuth><AllProducts /></RequireAuth>} />
      <Route path='/admin/product' element={<RequireAuth><NewProduct /></RequireAuth>} />
      <Route path ="/admin/product/:id" element={<RequireAuth><UpdateProduct /></RequireAuth>} />
      <Route path='/admin/orders' element={<RequireAuth><OrderList /></RequireAuth>} />
      <Route path="/admin/orders/:id" element={<RequireAuth><UpdateOrderStatus /></RequireAuth>} />
      <Route path="/admin/users" element={<RequireAuth><UserList /></RequireAuth>} />
      <Route path="/admin/user/:id" element={<RequireAuth><UpdateUser /></RequireAuth>} />
      <Route path="/admin/reviews" element={<RequireAuth><Reviews /></RequireAuth>} />
    </Routes>
  )
}

export default MainRoutes
