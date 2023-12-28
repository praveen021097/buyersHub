import React, { useEffect } from 'react'
import  "./myOrders.css"
import Loader from '../../components/Loader/Loader'
import { Link } from 'react-router-dom'
import {  Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { Launch } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../Redux/OrderReducer/action'
import { userInformation } from '../../Redux/AuthReducer/action'
import { GridCellParams } from '@mui/x-data-grid'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
const MyOrders = () => {
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.AuthReducer);
    const {userDetails} = useSelector((state)=>state.AuthReducer);
    const {orders,isLoading} = useSelector((state)=>state.OrderReducer);

    const columns =[
        {field:"id",headerName:"Order ID", minWidth:300, flex:1},
        {
            field:"status",
            headerName:"Status",
            minWidth:150,
            flex:0.5,
        },
        {
            field :"itemsQty",
            headerName:"Items Qty",
            type:"number",
            minWidth:150,
            flex:0.3
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
          },
          {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: function(params){
               return (
                <Link to={`/orders/${params.row.id}`}>
                <Launch />
              </Link>
               )
            },
          },
    ];

    const cellClassName = (params) => {
        if (params.field === 'status') {
          // Check the value of the 'status' column and return the appropriate class.
          return params.value === 'Delivered' ? 'greenColor' : 'redColor';
        }
        return ''; // For other columns, return an empty string.
      };
    console.log("orders",orders)
    const rows = [];

    orders &&
      orders.forEach((item, index) => {
        rows.push({
          itemsQty: item.orderItems.length,
          id: item._id,
          status: item.orderStatus,
          amount: item.totalPrice,
        });
      });
  
    useEffect(()=>{
            dispatch(getOrders(token));
            dispatch(userInformation(token))
    },[dispatch])
  return (
    <>
    <Navbar />
        {isLoading?(
            <Loader />
        ):(
            <div className={"myOrdersPage"}>
                <DataGrid 
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className={"myOrdersTable"}
                autoHeight
                cellClassName={cellClassName}
                
                />
                 <Typography id="myOrdersHeading">{userDetails.name}'s Orders</Typography>
            </div>
        )}
        <Footer />
    </>
  )
}

export default MyOrders

