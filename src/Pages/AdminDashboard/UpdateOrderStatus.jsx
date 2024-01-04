import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./UpdateOrderStatus.module.css";
import SideBar from './SideBar';
import Loader from '../../components/Loader/Loader';
import { Button, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { AccountTree } from '@mui/icons-material';
import { getSingleOrder } from '../../Redux/OrderReducer/action';
import MetaData from '../../components/MetaData/MetaData';

const UpdateOrderStatus = () => {
    const { singleOrder, isLoading } = useSelector((state) => state.OrderReducer);
    const [status, setStatus] = useState("")
    const { id } = useParams();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.AuthReducer);

    useEffect(() => {
        if (id && token) {
            dispatch(getSingleOrder(id, token))
        }
    }, [dispatch,id, token])
    
    const updateOrderSubmitHandler = () => {

    }

    return (
        <>
            <MetaData title={"Order status"} />
            <div className={styles.dashboard}>
                <SideBar />
                <div className={styles.newProductContainer}>
                    {isLoading ?(<Loader />):(
                        <div className={styles.confirmOrderPage} style={{ display: singleOrder.orderStatus === "Delivered" ? "block" : "grid" }}>
                        <div>
                            <div className={styles.confirmShippingArea}>
                                <Typography>Shipping Info</Typography>
                                <div className={styles.orderDetailsContainerBox}>
                                    <div>
                                        <p>Name:</p>
                                        <span>{singleOrder.user && singleOrder.user.name}</span>
                                    </div>
                                    <div>
                                        <p>PhoneNo:</p>
                                        <span>{singleOrder.shippingInfo && singleOrder.shippingInfo.phoneNumber}</span>
                                    </div>
                                    <div>
                                        <p>Address:</p>
                                        <span>{singleOrder.shippingInfo.address && singleOrder.shippingInfo.city}</span>
                                    </div>
                                </div>

                                <Typography>
                                    Payment
                                </Typography>
                                <div className={styles.orderDetailsContainerBox}>
                                    <div>
                                        <p className={singleOrder.paymentInfo && singleOrder.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}>
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
                                        <p className={
                                            singleOrder.orderStatus && singleOrder.orderStatus === "Delivered"
                                                ? styles.greenColor
                                                : styles.redColor
                                        }>
                                            {singleOrder.orderStatus && singleOrder.orderStatus}
                                        </p>
                                    </div>

                                </div>
                            </div>
                            <div className={styles.confirmCartItems}>
                                <Typography>Your Cart Items:</Typography>
                                {singleOrder.orderItems &&
                                    singleOrder.orderItems.map((item) => (
                                        <div key={item.product} className={styles.confirmCartItemsContainer}>
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

                        <div style={{
                            display: singleOrder.orderStatus === "Delivered" ? "none" : "block",
                        }}>
                            <form
                                className={styles.updateOrderForm}
                                onSubmit={updateOrderSubmitHandler}
                            >
                                <h1>Process Order</h1>

                                <div>
                                    <AccountTree />
                                    <select onChange={(e) => setStatus(e.target.value)}>
                                        <option value="">Choose Category</option>
                                        {singleOrder.orderStatus === "Processing" && (
                                            <option value="Shipped">Shipped</option>
                                        )}

                                        {singleOrder.orderStatus === "Shipped" && (
                                            <option value="Delivered">Delivered</option>
                                        )}
                                    </select>
                                </div>

                                <Button
                                    id="createProductBtn"
                                    className={styles.createProductBtn}
                                    type="submit"
                                    disabled={
                                        isLoading ? true : false || status === "" ? true : false
                                    }
                                >
                                    Process
                                </Button>
                            </form>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default UpdateOrderStatus

