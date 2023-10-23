import React, { useEffect } from 'react'
import styles from "./HomePage.module.css"
import { CgMouse } from 'react-icons/cg'
import Products from '../../components/Products/Products';
import MetaData from '../../components/MetaData/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux/ProductReducer/action';
import Loader from '../../components/Loader/Loader';
const product = {

    name:"sjdsadjs",
    price:467346,
    _id:4455
};

const HomePage = () => {
  const {isLoading, products} = useSelector((store)=>store.ProductReducer);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(products?.length===0){
      dispatch(getProducts())
    }
  },[products?.length,dispatch])

  console.log("products",products.products)
  return (
    <>
    {
      isLoading?(<Loader />):(<>
      <MetaData title={"homePage"} />
              <div className={styles.banner}>
                  <p>Welcome to BuyersHub</p>
                  <h1>Find Amazing Products below</h1>
                  <a href="#container">
                     <button > Scroll <CgMouse /></button>
                  </a>
              </div>
              <h2 className={styles.homeHeading} id='container'>Featured Products</h2>
              <div className={styles.container} >
                    {products.length!==0 && products.map((item)=>{
                      return <Products product={item} key={item._id} />
                    })}
              </div>
      </>)
    }</>
  )
}

export default HomePage
