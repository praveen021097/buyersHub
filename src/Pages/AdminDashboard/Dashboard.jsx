import React, { useEffect } from 'react'
import styles from "./Dashboard.module.css"
import SideBar from './SideBar'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

import { Doughnut, Line } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAdminProducts } from '../../Redux/ProductReducer/action'
import Navbar from '../../components/Navbar/Navbar'
import { getAllAdminOrders } from '../../Redux/OrderReducer/action'
import { getAllUsers } from '../../Redux/UserDataReducer/action'
import MetaData from '../../components/MetaData/MetaData'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);




const Dashboard = () => {
const {isLoading, products} =useSelector((state)=>state.ProductReducer);
const {orders} = useSelector((state)=>state.OrderReducer);
const {users} = useSelector((state)=>state.UserDataReducer);
const {token} = useSelector((state)=>state.AuthReducer);
const dispatch = useDispatch();

let outOfStock  =0;
products.forEach((item) => {
    if (item.Stock === 0) {
      outOfStock += 1;
    }
  });

useEffect(()=>{
    
        dispatch(getAllAdminProducts(token))
        dispatch(getAllAdminOrders(token))
        dispatch(getAllUsers(token))
    
},[dispatch,token])

let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 73, 49)"],
                data: [4000, totalAmount],
            },
        ],
    }

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, products.length-outOfStock],
            },
        ],
    };
    return (<>
        <Navbar />
        <MetaData title={"admin Dashboard"} />
        <div className={styles.dashboard}>
            <SideBar />
            <div className={styles.dashboardContainer}>
                <Typography component={"h1"}>Dashboard</Typography>
                <div className={styles.dashboardSummary}>
                    <div>
                        <p>Total Amount <br />₹{totalAmount}</p>
                    </div>
                    <div className={styles.dashboardSummaryBox2}>
                        <Link to={"/admin/products"}>
                            <p>Products</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to={"/admin/orders"}>
                            <p>Orders</p>
                            <p>{orders.length-1}</p>
                        </Link>
                        <Link to={"/admin/users"}>
                            <p>Users</p>
                            <p>{users.length}</p>
                        </Link>

                    </div>
                </div>
                <div className={styles.lineChart}>
                    <Line data={lineState} />
                </div>
                <div className={styles.doughnutChart}>
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard
