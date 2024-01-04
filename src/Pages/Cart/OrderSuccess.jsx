import React from 'react'
import styles from "./OrderSuccess.module.css";
import { CheckCircle } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MetaData from '../../components/MetaData/MetaData';
const OrderSuccess = () => {
  return (
    <>
    <MetaData title={"Order success"} />
    <div className={styles.orderSuccess}>
      <CheckCircle />
      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
    </>
  )
}

export default OrderSuccess

