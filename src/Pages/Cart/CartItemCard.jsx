import React from 'react'
import styles from "./CartItemCard.module.css"
import { Link } from 'react-router-dom'
const CartItemCard = ({item,deleteCartItems}) => {

  return (
   <div className={styles.cartItemCard}>
    <img src={item.image} alt="sss" />
    <div>
      <Link to={`/product/${item.product}`}>{item.name}</Link>
      <span>{`Price: ₹${item.price}`}</span>
      <p onClick={()=>deleteCartItems(item.product)}>Remove</p>
    </div>
   </div>
  )
}

export default CartItemCard
