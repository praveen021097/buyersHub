import React, { useEffect } from 'react'
import styles from "./ConfirmOrder.module.css";
import CheckoutSteps from './CheckoutSteps';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { userInformation } from '../../Redux/AuthReducer/action';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import MetaData from '../../components/MetaData/MetaData';


const ConfirmOrder = () => {
    const { cartItems, shippingInfo } = useSelector((state) => state.CartReducer);
    const { userDetails } = useSelector((state) => state.AuthReducer);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(userInformation)
    },[dispatch])
    const subTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)

    const shippingCharges = subTotal > 1000 ? 0 : 200;

    const tax = subTotal * 0.18;

    const totalPrice = subTotal + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subTotal,
            shippingCharges,
            tax,
            totalPrice,
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate("/process/payment")
    };
  
    return (
        <>
            <MetaData title={"Confirm order"} />
            <Navbar />
            <CheckoutSteps activeStep={1} />
            <div className={styles.confirmOrderContainer}>
                <div>
                    <div className={styles.confirmShippingArea}>
                        <Typography>Shipping Info</Typography>
                        <div className={styles.confirmShippingAreaBox}>
                            <div>
                                <p>Name:</p>
                                <span>{userDetails.name}</span>

                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNumber}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>

                        </div>

                    </div>
                    <div className={styles.confirmCartItems}>
                    <Typography>Your Cart Items:</Typography>
                        <div className={styles.confirmCartItemsContainer}>
                        {
                            cartItems && cartItems.map((item) => (
                                <div key={item.product}>
                                    <img src={item.image} alt={item.name} />
                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                    <span>{item.quantity} X ₹{item.price} =<b>₹{item.price * item.quantity}</b></span>
                                </div>
                            ))
                        }
                        </div>

                    </div>
                </div>
                {/* confirm cart */}
                <div>
                <div className={styles.orderSummary}>
                    <Typography>Order Summary</Typography>
                    <div>
                        <div>
                            <p>Subtotal:</p>
                            <span>₹{subTotal}</span>
                        </div>
                        <div>
                            <p>Shipping Charges:</p>
                            <span>₹{shippingCharges}</span>
                        </div>
                        <div>
                            <p>GST:</p>
                            <span>₹{tax}</span>
                        </div>
                    </div>
                    <div className={styles.orderSummaryTotal}>
                        <p>
                            <b>Total:</b>
                        </p>
                        <span>₹{totalPrice}</span>
                    </div>
                    <button onClick={proceedToPayment}>Proceed To Payment</button>
                </div>
            </div>
            </div>
            {/* order summary */}
          <Footer />  
        </>
    )
}

export default ConfirmOrder
