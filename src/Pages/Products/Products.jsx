import React, { useEffect, useState } from 'react';
import styles from "./Products.module.css";
import Loader from '../../components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux/ProductReducer/action';
import ProductsCard from '../../components/ProductsCard/ProductsCard';
import {useParams } from 'react-router-dom';
import PaginationProducts from '../../components/Pagination/PaginationProducts';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import MetaData from '../../components/MetaData/MetaData';

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];

const Products = () => {
    const { isLoading, products, productsCount, resultPerPage, filterProductCount } = useSelector((state) => state.ProductReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 250000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const dispatch = useDispatch();
    const { keyword } = useParams();

    const setCurrentPageNo = (e) => {
        setCurrentPageNo(e.target.value)
    }
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }

    let count = filterProductCount;

    useEffect(() => {
        dispatch(getProducts(keyword, currentPage, price, category, ratings))
    }, [dispatch, keyword, currentPage, price, category, ratings])

    return (
        <>
            <MetaData title={"Products"} />
            <Navbar />
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
                            max={250000}

                        />
                        <Typography>Categories</Typography>
                        <ul className={styles.categoryBox}>
                            {categories.map((category) => (
                                <li
                                    className={styles.categoryLink}
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                                step={0.1}
                            />
                        </fieldset>

                    </div>
                    {resultPerPage < count && <PaginationProducts currentPage={currentPage} resultPerPage={resultPerPage} setCurrentPage={setCurrentPage} productsCount={productsCount} />}
                </>)
            }
            <Footer />
        </>
    )
}

export default Products
