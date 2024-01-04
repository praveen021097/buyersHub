import React, { useEffect } from 'react'
import styles from "./Profile.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userInformation } from '../../../Redux/AuthReducer/action'
import Loader from '../../Loader/Loader'
import Footer from '../../Footer/Footer'
import Navbar from '../../Navbar/Navbar'
const Profile = () => {
    const {userDetails ,isAuth,isLoading,token} = useSelector((state)=>state.AuthReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(isAuth===false){
            navigate("/login-signUp")
        }
        
    },[isAuth])
    useEffect(()=>{
      
            dispatch(userInformation(token))
     

    },[])
    console.log("userDetails",userDetails)
  return (
   <>
   <Navbar />
    {isLoading?(<Loader />):(<div className={styles.profileContainer}>
        <div>
            <h1>My Profile</h1>
            <img src={userDetails?.avatar?.url} alt={userDetails.name} />
            <Link to={"/update-profile"}>Edit Profile</Link>
        </div>
        <div>
            <div>
                <h4>Full Name</h4>
                <p>{userDetails?.name}</p>
            </div>
            <div>
                <h4>Email</h4>
                <p>{userDetails?.email}</p>
            </div>
            <div>
                <h4>Joined On</h4>
                <p>{userDetails?.createdAt.substr(0,10)}</p>
            </div>
            <div>
                <Link to={"/orders"}>My Orders</Link>
                <Link to={"/password/update"}>change password</Link>
            </div>
        </div>

    </div>)}
    <Footer />
    </>
  )
}

export default Profile
