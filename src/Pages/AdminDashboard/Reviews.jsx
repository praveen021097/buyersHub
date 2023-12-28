import React, { useState,Fragment, useEffect } from 'react'
import styles from "./Reviews.module.css";
import SideBar from './SideBar';
import { Star } from '@mui/icons-material';
import { Button } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import { DataGrid } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';
import { deleteReview, getAllProductReview } from '../../Redux/ReviewReducer/action';
import { DELETE_REVIEW_SUCCESS } from '../../Redux/ReviewReducer/actionTypes';
import Loader from '../../components/Loader/Loader';
const Reviews = () => {
    const [productId, setProductId] = useState("");
    const {isLoading,reviews,isDeleted} = useSelector((state)=>state.ReviewReducer);
    const {token} = useSelector((state)=>state.AuthReducer);
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(getAllProductReview(productId))
    },[dispatch,isDeleted])
    

    const productReviewSubmitHandler = (e) => {
            e.preventDefault()
            dispatch(getAllProductReview(productId))
    }
    console.log("reviews",reviews)
    const deleteReviewHandler =(reviewId)=>{
            dispatch(deleteReview(productId,reviewId,token)).then((res)=>{
              if(res == DELETE_REVIEW_SUCCESS){
                console.log("review deleted")
              }
            })
    }
    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "user",
          headerName: "User",
          minWidth: 200,
          flex: 0.6,
        },
    
        {
          field: "comment",
          headerName: "Comment",
          minWidth: 350,
          flex: 1,
        },
    
        {
          field: "rating",
          headerName: "Rating",
          type: "number",
          minWidth: 180,
          flex: 0.4,
    
         
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: function(params){
            console.log("params",params.id)
            return (
              <Fragment>
                <Button
                  onClick={() =>
                   
                    deleteReviewHandler(productId,params.id,token)
                    
                  }
                >
                  <Delete />
                </Button>
              </Fragment>
            );
          },
        },
      ];
    
      const rows = [];
    
      reviews &&
        reviews.forEach((item) => {
          rows.push({
            id: item._id,
            rating: item.rating,
            comment: item.comment,
            user: item.name,
          });
        });
     const cellClassName = (params) => {
            return params.rating >= 3
              ? "greenColor"
              : "redColor";
          }
    return (
        <>
            <div className={styles.dashboard}>
                <SideBar />
                <div className={styles.productReviewsContainer}>
                    <form
                        onSubmit={productReviewSubmitHandler}
                        className={styles.productReviewsForm}
                    >
                        <h1 className={styles.productReviewsFormHeading}>All Reviews</h1>
                        <div>
                            <Star />
                            <input
                                type="text"
                                placeholder='Product Id'
                                required
                                value={productId}
                                onChange={(e) => { setProductId(e.target.value) }}
                            />
                        </div>
                        <Button
                            id="createProductButton"
                            className={styles.createProductButton}
                            type="submit"
                            disabled={isLoading ? true : false || productId === "" ? true : false}
                        >Search</Button>
                    </form>
                    {reviews && reviews.length >0 ?(
                        isLoading?<Loader />:<DataGrid
                        rows={rows}
                        columns={columns}
                        pageSizeOptions={10}
                        disableRowSelectionOnClick
                        className={styles.productListTable}
                        autoHeight={true}
                        cellClassName={cellClassName}
                        />

                    ):(
                        <h1 className={styles.productReviewsFormHeading}>No reviews Found</h1>
                    )}

                </div>
            </div>
        </>
    )
}

export default Reviews
