import React, { useState } from 'react'
import styles from "./Navbar.module.css"
import { CgProfile, CgSearch, CgShoppingCart } from "react-icons/cg";
import {GiHamburgerMenu} from "react-icons/gi";
import {RxCross2} from "react-icons/rx";
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false)
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
            <li>Services</li>
            <li>Contact</li>
          </ul>
        </div>
        {/* third part icons */}
        <div className={styles.iconsContainer}>
          <ul className={styles.iconsDesktop}>
            <li>
              <Link to={"/searchProducts"}><CgSearch className={styles.search} /></Link>
            </li>
            <li>
              <CgShoppingCart className={styles.cart} />
            </li>
            <li>
              <CgProfile className={styles.profile} />
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
