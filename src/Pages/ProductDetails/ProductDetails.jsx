import React, { useEffect, useState } from 'react'
import styles from "./ProductDetails.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, getSingleProduct } from '../../Redux/ProductReducer/action';
import {  useLocation, useNavigate, useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'
import ReactStars from "react-rating-stars-component";
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import { addProductToCart } from '../../Redux/CartReducer/actions';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material';
import { addNewReview } from '../../Redux/ReviewReducer/action';
import Loader from '../../components/Loader/Loader';
import MetaData from '../../components/MetaData/MetaData';



const ProductDetails = () => {
    const {isLoading, products} = useSelector((state)=>state.ProductReducer);
    const {success} = useSelector((state)=>state.ReviewReducer);
    const {token} = useSelector((state)=>state.AuthReducer);
    const dispatch = useDispatch();
    const {id} = useParams()
    const [currentProduct ,setCurrentProduct] = useState({});
    const [quantity,setQuantity] = useState(1);
    const [rating,setRating] = useState(0);
    const [open,setOpen] = useState(false);
    const [comment, setComment] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
 
    console.log("current",currentProduct)

    const increaseQuantity =()=>{
                if(currentProduct.stocks <= quantity){
                    return;
                }
                const qty = quantity+1;
                setQuantity(qty);

    }
    const decreaseQuantity =()=>{
            if(quantity <= 1){
                return 
            }
            const qty = quantity -1 ;
            setQuantity(qty)
    }

    const addToCartHandler =()=>{
        dispatch(addProductToCart(id,quantity))
        alert("product added in cart successfully")
    }

    const submitReviewToggle =()=>{
        open?setOpen(false):setOpen(true);
    }
    const submitReviewHandler =()=>{
        if(!token){
           navigate("/login-signUp",{replace:true})
        }
        const myForm = new FormData();

        myForm.set("rating",rating);
        myForm.set("comment",comment);
        myForm.set("productId",id)
        dispatch(addNewReview(myForm,token))
        setOpen(false)
    }

       
    useEffect(()=>{
       
   
        dispatch(getProducts())
        if(success){
            dispatch(getProducts())
        }
    
           
    },[dispatch,id,setCurrentProduct,success])

    useEffect(()=>{
   
           if(id && products.length != 0){
            const currentPro = products && products.find((el)=>el._id === id);
            currentPro && setCurrentProduct(currentPro);
           }
        
    },[id,products ,setCurrentProduct])
    const options ={

       size:"size-large",
        value: currentProduct?.rating ,
        readOnly:true,
       precision:0.5,
            color:"yellow"
    }
  return (
   <>
   {
    isLoading ? (<Loader />):( <>
      <MetaData title={`${currentProduct.name} -- BuyersHub`} />
        <div className={styles.productDetails}>
                <div className={styles.imageDiv}>
                    <Carousel className={styles.Carousel} >
                        {
                            currentProduct.images && currentProduct.images.map((item,i)=>(<img src={item.url} alt={item.url} key={i} className={styles.CarouselImage} />))
                        }
                    </Carousel>
                </div>
                <div>
                    <div className={styles.detailsBlock1}>
                            <h2>{currentProduct.name}</h2>
                            <p>Product #{currentProduct._id}</p>
                    </div>
                    <div className={styles.detailsBlock2}>
                            <Rating {...options} />
                            <span>({currentProduct.numOfReviews} Reviews)</span>
                    </div>
                    <div className={styles.detailsBlock3}>
                            <h1>{`₹${currentProduct.price}`}</h1>
                            <div className={styles.detailsBlock31}>
                                <div className={styles.detailsBlock311}>
                                    <button onClick={decreaseQuantity}>-</button>
                                    <input type="number" value={quantity} readOnly />
                                    <button onClick={increaseQuantity}>+</button>
                                </div>
                                <button onClick={addToCartHandler}   disabled={currentProduct.stocks < 1 ? true : false}>Add To Cart</button>
                            </div>
                            <p>
                                Status:
                                <b className={currentProduct.Stock<1? styles.redColor:styles.greenColor}>
                                    {currentProduct.Stock<1?"OutOfStock":"InStock"}
                                </b>
                            </p>
                    </div>
                    <div className={styles.detailsBlock4}>
                        Description : <p>{currentProduct.description}</p>
                    </div>
                    <button className={styles.submitReview}  onClick={submitReviewToggle}>Submit Review</button>
                </div>
        </div>
        <h3 className={styles.reviewsHeading}>REVIEWS</h3>
        <Dialog
        aria-labelledby='simple-dialog-title'
        open={open}
        onClose={submitReviewToggle}
        >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className={styles.submitDialog}>
                <Rating  onChange={(e)=>setRating(e.target.value)}/>
                <textarea  className={styles.submitDialogTextArea} id="" value={comment} onChange={(e)=>setComment(e.target.value)} cols="30" rows="3"></textarea>
                            <DialogActions>
                                <Button color={"secondary"} onClick={submitReviewToggle}>Cancel</Button>
                                <Button color={"primary"} onClick={submitReviewHandler}>Submit</Button>
                            </DialogActions>
            </DialogContent>
        </Dialog>
        {
            currentProduct.reviews && currentProduct.reviews[0]?(
                <div className={styles.reviews}>
                        {
                             currentProduct.reviews && currentProduct.reviews.map((review)=><ReviewCard  review={review} />)
                        }
                        
                </div>
            ):(
                <div>No Reviews Yet</div>
            )
        }
        </>)
   }
   </>
  )
}

export default ProductDetails
