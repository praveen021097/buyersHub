import React, { useEffect } from 'react'
import styles from "./Cart.module.css"
import { useDispatch, useSelector } from 'react-redux'
import CartItemCard from './CartItemCard';
import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { addProductToCart, removeItemsFromCart } from '../../Redux/CartReducer/actions';
import { RemoveShoppingCart } from '@mui/icons-material';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import 'react-toastify/dist/ReactToastify.css';
import MetaData from '../../components/MetaData/MetaData';
const Cart = () => {
    const dispatch = useDispatch();
    const {cartItems} = useSelector((state)=>state.CartReducer);
    const navigate = useNavigate();
    
    const increaseQuantity = (id,quantity,stock) =>{
            const newQty = quantity + 1;
            if(stock <= quantity){
                return;
            }
            dispatch(addProductToCart(id,newQty))
    };

    const decreaseQuantity =(id,quantity)=>{
        const newQty = quantity +1;
        if(1>=quantity){
            return;
        }
        dispatch(addProductToCart(id,newQty));
    }

    const deleteCartItems = (id) =>{
        dispatch(removeItemsFromCart(id)).then((res)=>{
            
        })
    }

    const checkoutHandler =()=>{
            navigate("/shipping",{replace:true})
    }
  return (
    <>
    <MetaData title={"Cart"} />
    <Navbar />
    {cartItems.length === 0 ?(
        <div className={styles.emptyCart}>
           <RemoveShoppingCart />
            <Typography>No Product in Your Cart</Typography>
            <Link to={"/products"}>View Products</Link>
        </div>
    ):(<>
        <div className={styles.cartPage}>
            <div className={styles.cartHeader}>
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>
            {cartItems.length>0 && cartItems.map((item)=>(
                <div className={styles.cartContainer} key={item.product}>
                    <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                    <div className={styles.cartInput}>
                        <button onClick={()=>decreaseQuantity(item.product,item.quantity)}>
                            -
                        </button>
                        <input type="number" value={item.quantity} readOnly />
                        <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>
                            +
                        </button>

                    </div>
                    <p className={styles.cartSubtotal}>{`₹${item.price*item.quantity}`}</p>
                </div>
            ))}
            <div className={styles.cartGrossProfit}>
                <div></div>
                <div className={styles.cartGrossProfitBox}>
                    <p>Gross Total</p>
                    <p>{`₹${cartItems.reduce((acc,item)=> acc+item.quantity*item.price,0)}`}</p>
                </div>
                <div></div>
                <div className={styles.checkOutBtn}>
                    <button onClick={checkoutHandler}>Check Out</button>
                </div>
            </div>

        </div>
    </>)}
    <Footer />
    </>
  )
}

export default Cart
