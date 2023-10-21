import React from 'react'
import styles from "./HomePage.module.css"
import { CgMouse } from 'react-icons/cg'
import Products from '../Products/Products';
const product = {

    name:"sjdsadjs",
    price:467346,
    _id:4455
};

const HomePage = () => {
  return (
    <>
            <div className={styles.banner}>
                <p>Welcome to BuyersHub</p>
                <h1>Find Amazing Products below</h1>
                <a href="#">
                   <button> Scroll <CgMouse /></button>
                </a>
            </div>
            <h2 className={styles.homeHeading}>Featured Products</h2>
            <div className={styles.container} id='container'>
                    <Products product={product} />
            </div>
    </>
  )
}

export default HomePage
