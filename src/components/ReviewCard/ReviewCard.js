import React from 'react';
import ReactStars from "react-rating-stars-component";
import {CgProfile} from "react-icons/cg";
import styles from "./ReviewCard.module.css";
const ReviewCard = ({review}) => {

    const options ={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        value: review.rating,
        isHalf:true
    }
  return (
    <div className={styles.reviewCard}>
            <CgProfile  size={"50px"} className={styles.profileIcon}/>
        <p>{review.name}</p>
        <ReactStars {...options} />
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
