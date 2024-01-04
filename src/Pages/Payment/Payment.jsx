import React, { useRef } from 'react'
import styles from "./Payment.module.css"
import CheckoutSteps from '../Cart/CheckoutSteps'
import { CardNumberElement,CardCvcElement,CardExpiryElement,useStripe,useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import { CreditCard,Event,VpnKey } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import { createOrder } from '../../Redux/OrderReducer/action'
import Navbar from '../../components/Navbar/Navbar'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MetaData from '../../components/MetaData/MetaData'
const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);
    const navigate = useNavigate();
    const {cartItems,shippingInfo} = useSelector((state)=>state.CartReducer);
    const {userDetails} = useSelector((state)=>state.AuthReducer);
    const {token} = useSelector((state)=>state.AuthReducer)

    const paymentData = {
        amount:Math.round(orderInfo.totalPrice*100),
    }

    const order = {
        shippingInfo,
        orderItems:cartItems,
        itemsPrice:orderInfo.subTotal,
        taxPrice:orderInfo.tax,
        shippingPrice:orderInfo.shippingCharges,
        totalPrice:orderInfo.totalPrice,
    }

    const submitHandler = async(e)=>{
        e.preventDefault();

        payBtn.current.disabled=true;

        try{
                const config ={
                    headers:{
                        "Content-Type":"application/json",
                        "authorization":`Bearer ${token}`,
                    },
                }

                const {data} = await axios.post("/api/v1/payment/process",paymentData,config);

                const client_secret = data.client_secret;

                if(!stripe || !elements){
                    return ;
                }
                const result = await stripe.confirmCardPayment(client_secret,{
                    payment_method:{
                        card:elements.getElement(CardNumberElement),
                        billing_details:{
                            name:userDetails.name,
                            email:userDetails.email,
                            address:{
                                line1:shippingInfo.address,
                                city:shippingInfo.city,
                                state:shippingInfo.state,
                                postal_code:shippingInfo.pinCode,
                                country:shippingInfo.country,
                            },
                        },
                    },
                });

                if(result.error){
                    payBtn.current.disabled = false;
                    toast.warning('something went wrong !',{
                        position:toast.POSITION.TOP_CENTER
                    })
                }
                else{
                    if(result.paymentIntent.status === "succeeded"){
                        order.paymentInfo = {
                            id: result.paymentIntent.id,
                            status: result.paymentIntent.status,
                          };
                          dispatch(createOrder(order,token))
                          toast.success('Payment Successfully!',{
                            position:toast.POSITION.TOP_CENTER
                        })
                        navigate("/success")
                    }
                    else{
                        toast.warning('something went wrong while making payment!',{
                            position:toast.POSITION.TOP_CENTER
                        })
                    }
                }


        }catch(err){
                payBtn.current.disabled= false;
                toast.warning('something went wrong while making payment!',{
                    position:toast.POSITION.TOP_CENTER
                })
        }

    }
  return (
    <>
    <MetaData title={"Payment"} />
    <Navbar />
    <CheckoutSteps activeStep={3} />
    <div className={styles.paymentContainer}>
        <form 
        className={styles.paymentForm}
        onSubmit={(e)=>submitHandler(e)}
        >
            <Typography>Card Info</Typography>
            <div>
                <CreditCard />
                <CardNumberElement className={styles.paymentInput} />
            </div>
            <div>
                <Event />
                <CardExpiryElement  className={styles.paymentInput}/>
            </div>
            <div>
                <VpnKey />
                <CardCvcElement  className={styles.paymentInput} />
            </div>
            <input 
            type="submit" 
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className={styles.paymentFormBtn}
            />
        </form>
    </div>
    </>
  )
}

export default Payment
