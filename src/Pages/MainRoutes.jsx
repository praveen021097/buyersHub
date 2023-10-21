import React from 'react'
import {Routes,Route} from "react-router-dom";
import Header from '../components/Header/Header';
const MainRoutes = () => {
  return (
        <Routes>
            <Route  path='/' element={<Header />}/>
        </Routes>
  )
}

export default MainRoutes
