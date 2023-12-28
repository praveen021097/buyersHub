import React, { useState } from 'react'
import styles from "./Navbar.module.css"
import { CgProfile, CgSearch, CgShoppingCart } from "react-icons/cg";
import {GiHamburgerMenu} from "react-icons/gi";
import {RxCross2} from "react-icons/rx";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart,ListAlt,Person,ExitToAppSharp, ListAltOutlined,LoginSharp } from '@mui/icons-material';
import { userLogout } from '../../Redux/AuthReducer/action';

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const {isAuth} = useSelector((state)=>state.AuthReducer);
  const dispatch = useDispatch();

  const handleLogOut =()=>{
      dispatch(userLogout())
  }
  return (
    <>
      <nav className={styles.mainNav}>
        {/* logo part start */}
        <div className={styles.logo}>
          <h2>BuyersHub</h2>
        </div>
        {/* 2n menu part */}
        <div className={showMediaIcons ? (styles.menuLink, styles.mobileMenuLink) : (styles.menuLink)}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="#">Services</Link></li>
            <li><Link to={"#"}>About Us</Link></li>
          </ul>
        </div>
        {/* third part icons */}
        <div className={styles.iconsContainer}>
          <ul className={styles.iconsDesktop}>
            <li>
              <Link to={"/searchProducts"}><CgSearch className={styles.search} /></Link>
            </li>
            <li>
              <Link to={"/cart"}><CgShoppingCart className={styles.cart} /></Link>
            </li>
            <li className={styles.profileHover}>
              <Link to={isAuth?"#":"/login-signUp"}>
              <CgProfile className={styles.profile} />
              </Link>
              <div className={styles.profileDiv}>
                      <div className={styles.innerMenu}>
                        <ul>
                          <li><ShoppingCart />Orders</li>
                          <li><Person /> <Link to={"/me"}>Me</Link></li>
                          <li><ListAltOutlined /> <Link to={"/admin/dashboard"}>Dashboard</Link></li>
                          {isAuth?(<li onClick={handleLogOut}> <ExitToAppSharp /> Logout</li>):<li ><LoginSharp /><Link to={"/login-signUp"}>  Login</Link></li>}
                        </ul>
                      </div>
              </div>
            </li>
          </ul>
          {/* hamburger menu start */}
          <div className={styles.hamburgerMenu}>
                <GiHamburgerMenu onClick={()=>setShowMediaIcons(!showMediaIcons)} size={"25px"}/>
          </div>
        </div>



      </nav>

    </>
  )
}

export default Navbar
