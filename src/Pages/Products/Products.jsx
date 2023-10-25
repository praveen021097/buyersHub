import React, { useEffect, useState } from 'react'
import styles from "./Products.module.css"
import Loader from '../../components/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../Redux/ProductReducer/action'
import ProductsCard from '../../components/ProductsCard/ProductsCard'
import { useLocation, useParams } from 'react-router-dom'
import PaginationProducts from '../../components/Pagination/PaginationProducts'
import { Slider, Typography } from '@mui/material'


const Products = () => {
    const { isLoading, products, productsCount, totalPages, resultPerPage,filterProductCount } = useSelector((state) => state.ProductReducer);
    const [currentPage, setCurrentPage] = useState(1)
    const [price,setPrice] = useState([0,250000]);
    const dispatch = useDispatch();
    const { keyword } = useParams();

    const setCurrentPageNo = (e) => {
        setCurrentPageNo(e)
    }
    const priceHandler =(event,newPrice)=>{
        event.preventDefault()
        setPrice(newPrice);
    }
    useEffect(() => {

        dispatch(getProducts(keyword, currentPage,price))

    }, [dispatch, keyword, currentPage,price])
let count=filterProductCount;

   
    return (
        <>
            {
                isLoading ? <Loader /> : (<>
                    <h1 className={styles.productHeading}>Products</h1>
                    <div className={styles.products}>
                        {products && products.map((item) => <ProductsCard product={item} />)}

                    </div>
                    <div className={styles.filterBox}>
                        <Typography>Price</Typography>
                        <Slider 
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay='auto'
                        aria-labelledby='range-slider'
                        min={0}
                        max={25000}
                        />
                    </div>
                    {resultPerPage < count &&  <PaginationProducts currentPage={currentPage} resultPerPage={resultPerPage} setCurrentPage={setCurrentPage} productsCount={productsCount} /> }
                </>)
            }
        </>
    )
}

export default Products
