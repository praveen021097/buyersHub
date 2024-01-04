import React, { useEffect, useState } from 'react'
import styles from "./OrderDetails.module.css";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../Redux/OrderReducer/action';
import { userInformation } from '../../Redux/AuthReducer/action';
import Loader from '../../components/Loader/Loader';
import MetaData from '../../components/MetaData/MetaData';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
const OrderDetails = () => {
    const {orders, singleOrder, isLoading } = useSelector((state) => state.OrderReducer);
    const {token,userDetails} = useSelector((state)=>state.AuthReducer);
    const [currentOrder,setCurrentOrder] = useState({});
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(getOrders(token))
            dispatch(userInformation(token))
        
    }, [id, token, dispatch]);
    useEffect(()=>{
            if(id){
                const currentO = orders && orders.find((item)=> item._id === id);
            currentO && setCurrentOrder(currentO);
            }
    },[setCurrentOrder,id])
  
    return (
        <>
            <MetaData title={"Order Details"} />
            <Navbar />
            {isLoading ? (<Loader />) : (
                <>
                    <MetaData title={"Order Details"} />
                    <div className={styles.orderDetailsPage}>
                        <div className={styles.orderDetailsContainer}>
                            <Typography component={"h1"}>Order #{singleOrder && singleOrder._id}</Typography>
                            <Typography>Shipping Info</Typography>
                            <div className={styles.orderDetailsContainerBox}>
                                <div>
                                    <p>Name:</p>
                                    <span>{userDetails.name}</span>
                                </div>
                                <div>
                                    <p>Phone:</p>
                                    <span>{currentOrder.shippingInfo && currentOrder.shippingInfo?.phoneNumber}</span>
                                </div>
                                <div>
                                    <p>Address:</p>
                                    <span>{currentOrder.shippingInfo && currentOrder.shippingInfo?.address}</span>
                                </div>

                            </div>
                            <Typography>Payment</Typography>
                            <div className={styles.orderDetailsContainerBox}>
                                <div>
                                    <p
                                        style={{
                                            color:currentOrder.paymentInfo &&
                                                currentOrder.paymentInfo.status === "succeeded"
                                                ? "green"
                                                : "red"
                                        }}
                                    >
                                        {currentOrder.paymentInfo &&
                                            currentOrder.paymentInfo.status === "succeeded"
                                            ? "PAID"
                                            : "NOT PAID"}
                                    </p>
                                </div>

                                <div>
                                    <p>Amount:</p>
                                    <span>INR{currentOrder.totalPrice && currentOrder.totalPrice}</span>
                                </div>
                            </div>
                            <Typography>Order Status</Typography>
                            <div className={styles.orderDetailsContainerBox}>
                                <div>
                                    <p
                                        style={{color:
                                            currentOrder.orderStatus && currentOrder.orderStatus === "Delivered"
                                                ? "green"
                                                : "red"
                                        }}
                                    >
                                        {currentOrder.orderStatus && currentOrder.orderStatus}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.orderDetailsCartItems}>
                            <Typography>Order Items:</Typography>
                            <div className={styles.orderDetailsCartItemsContainer}>
                                {currentOrder.orderItems &&
                                    currentOrder.orderItems.map((item) => (
                                        <div key={item.product}>
                                            <img src={item.image} alt="Product" />
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>{" "}
                                            <span>
                                                {item.quantity} X ₹{item.price} ={" "}
                                                <b>₹{item.price * item.quantity}</b>
                                            </span>
                                        </div>
                                    ))}
                            </div>
                        </div>

                    </div>

                </>
            )}
            <Footer />
        </>

    )
}

export default OrderDetails
