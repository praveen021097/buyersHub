import React from 'react'
import {Routes,Route} from "react-router-dom";
import HomePage from './Home/HomePage';
import ProductDetails from './ProductDetails/ProductDetails';
import Products from './Products/Products';
import Search from '../components/Search/Search';
const MainRoutes = () => {
  return (
        <Routes>
            <Route  path='/' element={<HomePage />}/>
            <Route path ="/product/:id" element={<ProductDetails />}  />
            <Route path = "/products" element={<Products />} />
            <Route path = "/products/:keyword" element={<Products />} />
            <Route path = "/searchProducts" element={<Search />} />
        </Routes>
  )
}

export default MainRoutes
