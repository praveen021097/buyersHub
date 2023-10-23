import React, { useEffect, useState } from 'react'
import styles from "./ProductDetails.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../Redux/ProductReducer/action';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'
import ReactStars from "react-rating-stars-component";
const options ={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    value: 2.5,
    isHalf:true
}
const ProductDetails = () => {
    const {isLoading, products} = useSelector((state)=>state.ProductReducer);
    const dispatch = useDispatch();
    const {id} = useParams()
    const [currentProduct ,setCurrentProduct] = useState({});
    useEffect(()=>{
            if(products?.length === 0){
                    dispatch(getProducts)
            }
    },[dispatch,products?.length])

    useEffect(()=>{
        if(id){
            const currentPro = products && products.find((el)=>el._id === id);
            currentPro && setCurrentProduct(currentPro);
        }
    },[id,setCurrentProduct])
    console.log("current",currentProduct)
  return (
    <>
    <div className={styles.productDetails}>
            <div>
                <Carousel>
                    {
                        currentProduct.images && currentProduct.images.map((item,i)=>(<img src={item.url} alt={item.url} key={i} />))
                    }
                </Carousel>
            </div>
            <div>
                <div className={styles.detailsBlock1}>
                        <h2>{currentProduct.name}</h2>
                        <p>Product #{currentProduct._id}</p>
                </div>
                <div className={styles.detailsBlock2}>
                        <ReactStars {...options} />
                        <span>({currentProduct.numOfReviews} Reviews)</span>
                </div>
                <div className={styles.detailsBlock3}>
                        <h1>{`${currentProduct.price}`}</h1>
                        <div className={styles.detailsBlock31}>
                            <div className={styles.detailsBlock311}>
                                <button>-</button>
                                <input type="number" value={1} />
                                <button>+</button>
                            </div>
                            <button>Add To Cart</button>
                        </div>
                        <p>
                            Status:
                            <b className={currentProduct.Stock<1? styles.redColor:styles.greenColor}>
                                {currentProduct.Stock<1?"OutOfStock":"InStock"}
                            </b>
                        </p>
                </div>
                <div className={styles.detailsBlock4}>
                    Description : <p>{currentProduct.description}</p>
                </div>
                <button>Submit Review</button>
            </div>
    </div>
    </>
  )
}

export default ProductDetails
