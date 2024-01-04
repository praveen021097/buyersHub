import React, { useEffect } from 'react'
import styles from "./AllProducts.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { getAllAdminProducts } from '../../Redux/ProductReducer/action';
import SideBar from './SideBar';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import { deleteProduct } from '../../Redux/ProductReducer/action';
import Loader from '../../components/Loader/Loader';
import { DELETE_PRODUCT_SUCCESS } from '../../Redux/ProductReducer/actionTypes';
import { deleteOrder, getAllAdminOrders } from '../../Redux/OrderReducer/action';
import { DELETE_ORDER_SUCCESS } from '../../Redux/OrderReducer/actionTypes';
import Navbar from '../../components/Navbar/Navbar';
import MetaData from '../../components/MetaData/MetaData';
const OrderList = () => {
    const dispatch = useDispatch();
    const {orders,isLoading } = useSelector((state)=>state.OrderReducer);
    const { token } = useSelector((state) => state.AuthReducer);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllAdminOrders(token))
    }, [dispatch])
    
    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id, token)).then((res) => {
            if (res === DELETE_ORDER_SUCCESS) {
                navigate("/admin/dashboard", { replace: true })
            }
        });
    };
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
        {
            field:"status",
            headerName:"Status",
            minWidth:200,
            flex:0.5,
        },
        {
            field :"itemsQty",
            headerName:"Items Qty",
            type:"number",
            minWidth:70,
            flex:0.3
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 200,
            flex: 0.5,
          },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 160,
            type: "number",
            sortable: false,
            renderCell: function (params) {
                return (
                    <>
                        <Link to={`/admin/orders/${params.row.id}`}>
                            <Edit />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteOrderHandler(params.row.id)
                            }
                        >
                            <Delete />
                        </Button>
                    </>
                );
            },
        },
    ];
    const rows = [];

    orders &&
        orders.forEach((item) => {
            rows.push({
                id: item._id,
                itemsQty: item.orderItems.length,
                amount: item.totalPrice,
                status: item.orderStatus,
            });
        });
        const cellClassName = (params) => {
            if (params.field === 'status') {
              // Check the value of the 'status' column and return the appropriate class.
              return params.value === 'Delivered' ? 'greenColor' : 'redColor';
            }
            return ''; // For other columns, return an empty string.
          };
    return (
        <>
        <Navbar />
        <MetaData title={"Order list"} />
            <div className={styles.dashboard}>
                <SideBar />
                <div className={styles.productListContainer}>
                    <h1 id='productListHeading' className={styles.productListHeading}>ALL PRODUCTS</h1>
                    {
                        isLoading ? (<Loader />) : (<DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            className={styles.productListTable}
                            cellClassName={cellClassName}
                            autoHeight
                        />)
                    }
                </div>


            </div>
        </>
    )
}



export default OrderList
