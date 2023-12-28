import React from 'react'
import styles from "./Footer.module.css"
import {FaInstagram,FaYoutube,FaFacebook,FaTwitter,FaMedium} from "react-icons/fa"
const Footer = () => {
    return (
        <>
            <div className={styles.footerContainer}>
                <div className={styles.leftPart}>
                    <div className={styles.logo}>
                        <h2>BuyersHub</h2>
                    </div>
                    <input type="text" placeholder='Enter Your Email' />
                    <button>Subscribe</button>
                    <p>Get monthly updates and free resources.</p>
                </div>

                <div className={styles.rightPart}>
                    <div className={styles.mobirise}>
                        <p className={styles.head}>Mobirise</p>
                        <p className={styles.mobiMenu}>Phone: 7523017952</p>
                        <p className={styles.mobiMenu}>Email: yourmail@example.com</p>
                        <p className={styles.mobiMenu}>Address:1234 Street Name City, AA 99999</p>
                        <div className={styles.socialMediaIcons}>
                                <div><FaInstagram className={styles.icon}/></div>
                                <div> <FaFacebook  className={styles.icon}/></div>
                                <div> <FaTwitter className={styles.icon} /></div>
                                <div> <FaYoutube  className={styles.icon}/></div>
                                <div><FaMedium className={styles.icon} /></div>
                        </div>
                    </div>
                    <div className={styles.recentNews}>
                        <p  className={styles.head}>Recent News</p>
                        <ul className={styles.linksMenu}>
                            <li>About Us</li>
                            <li>Services</li>
                            <li>Get in touch</li>
                        </ul>
                    </div>
                    <div className={styles.links}>
                        <p  className={styles.head}>Links</p>
                        <ul className={styles.linksMenu}>
                            <li>About Us</li>
                            <li>Services</li>
                            <li>Get in touch</li>
                        </ul>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Footer

