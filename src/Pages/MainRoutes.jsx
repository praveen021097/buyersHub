import React from 'react'
import {Routes,Route} from "react-router-dom";
import HomePage from './Home/HomePage';
import ProductDetails from './ProductDetails/ProductDetails';
const MainRoutes = () => {
  return (
        <Routes>
            <Route  path='/' element={<HomePage />}/>
            <Route path ="/products/:id" element={<ProductDetails />}  />
        </Routes>
  )
}

export default MainRoutes
