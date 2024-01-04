import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import styles from "./ProductsCard.module.css";
const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "tomato",
  value: 2.5,
  isHalf: true
}
const ProductsCard = ({ product }) => {
  return (
    <Link className={styles.productCard} to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars  {...options} /> <span>(256 reviews)</span>
      </div>
      <span>₹{product.price}</span>
    </Link>
  )
}

export default ProductsCard
