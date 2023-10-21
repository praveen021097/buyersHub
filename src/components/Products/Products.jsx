import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import styles from "./Products.module.css";
const options ={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    value:2.5,
    isHalf:true
}
const Products = ({product}) => {
  return (
    <Link  className={styles.productCart} to={product._id}>
    <img src="https://m.media-amazon.com/images/I/71rjzNln29L._AC_UL320_.jpg" alt="" />
    <p>{product.name}</p>
    <div>
        <ReactStars  {...options}/> <span>(256 reviews)</span>
    </div>
    <span>{product.price}</span>
    </Link>
  )
}

export default Products
