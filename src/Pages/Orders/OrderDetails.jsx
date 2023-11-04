import React, { useEffect } from 'react'
import styles from "./OrderDetails.module.css";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleOrder } from '../../Redux/OrderReducer/action';
import { userInformation } from '../../Redux/AuthReducer/action';
import Loader from '../../components/Loader/Loader';
import MetaData from '../../components/MetaData/MetaData';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const OrderDetails = () => {

    const { token } = useSelector((state) => state.AuthReducer);
    const { singleOrder, isLoading } = useSelector((state) => state.OrderReducer);
    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {

        if (id && token) {
            dispatch(getSingleOrder(id, token))
        }

    }, [id, token, dispatch]);

    console.log("singleOrder", singleOrder)
    return (
        <>
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
                                    <span>{"hsjdhskjhd"}</span>
                                </div>
                                <div>
                                    <p>Phone:</p>
                                    <span>{singleOrder.shippingInfo && singleOrder.shippingInfo?.phoneNumber}</span>
                                </div>
                                <div>
                                    <p>Address:</p>
                                    <span>{singleOrder.shippingInfo && `${singleOrder.shippingInfo.address}, ${singleOrder.shippingInfo.city}, ${singleOrder.shippingInfo.state}, ${singleOrder.shippingInfo.pinCode}, ${singleOrder.shippingInfo.country}`}</span>
                                </div>

                            </div>
                            <Typography>Payment</Typography>
                            <div className={styles.orderDetailsContainerBox}>
                                <div>
                                    <p
                                        className={
                                            singleOrder.paymentInfo &&
                                                singleOrder.paymentInfo.status === "succeeded"
                                                ? "greenColor"
                                                : "redColor"
                                        }
                                    >
                                        {singleOrder.paymentInfo &&
                                            singleOrder.paymentInfo.status === "succeeded"
                                            ? "PAID"
                                            : "NOT PAID"}
                                    </p>
                                </div>

                                <div>
                                    <p>Amount:</p>
                                    <span>{singleOrder.totalPrice && singleOrder.totalPrice}</span>
                                </div>
                            </div>
                            <Typography>Order Status</Typography>
                            <div className={styles.orderDetailsContainerBox}>
                                <div>
                                    <p
                                        className={
                                            singleOrder.orderStatus && singleOrder.orderStatus === "Delivered"
                                                ? "greenColor"
                                                : "redColor"
                                        }
                                    >
                                        {singleOrder.orderStatus && singleOrder.orderStatus}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.orderDetailsCartItems}>
                            <Typography>Order Items:</Typography>
                            <div className={styles.orderDetailsCartItemsContainer}>
                                {singleOrder.orderItems &&
                                    singleOrder.orderItems.map((item) => (
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
        </>
    )
}

export default OrderDetails
