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
import Navbar from '../../components/Navbar/Navbar';

const AllProducts = () => {
  const dispatch = useDispatch();
  const { isLoading, products } = useSelector((state) => state.ProductReducer);
  const { token } = useSelector((state) => state.AuthReducer);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllAdminProducts(token))
  }, [dispatch])

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id, token)).then((res) => {
      if (res === DELETE_PRODUCT_SUCCESS) {
        navigate("/admin/dashboard", { replace: true })
      }
    });
  };
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 160,
      flex: 1
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: function (params) {
        return (
          <>
            <Link to={`/admin/product/${params.row.id}`}>
              <Edit />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.row.id)
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stocks,
        price: item.price,
        name: item.name,
      });
    });
  return (
    <>
      <Navbar />
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
              autoHeight
            />)
          }
        </div>


      </div>
    </>
  )
}

export default AllProducts
