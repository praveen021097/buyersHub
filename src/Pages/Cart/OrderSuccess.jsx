import React from 'react'
import styles from "./OrderSuccess.module.css";
import { CheckCircle } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const OrderSuccess = () => {
  return (
    <div className={styles.orderSuccess}>
      <CheckCircle />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  )
}

export default OrderSuccess

