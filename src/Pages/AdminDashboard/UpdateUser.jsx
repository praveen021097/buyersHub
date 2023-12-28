import React, { useState, useEffect }  from 'react'
import {useDispatch, useSelector} from "react-redux";
import SideBar from './SideBar'
import Loader from '../../components/Loader/Loader';
import { MailOutline, Person, VerifiedUser } from '@mui/icons-material';
import { getSingleUser, updateUser, updateUserRole } from '../../Redux/UserDataReducer/action';
import {Button} from "@mui/material";
import {useParams} from "react-router-dom";
import styles from "./UpdateUser.module.css";

const UpdateUser = () => {
    const {isLoading, user} = useSelector((state)=>state.UserDataReducer);
    const { token } = useSelector((state) => state.AuthReducer);
    const dispatch = useDispatch();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [role, setRole] = useState("");
    const {id} = useParams();
    
    useEffect(()=>{
      if (user && user._id !== id) {
        dispatch(getSingleUser(id,token));
      } else {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      }
    },[dispatch,user._id]);

    const updateUserSubmitHandler =(e)=>{
        e.preventDefault();
        const payload ={
          name:name,
          email:email,
          role:role
        }

        console.log("payload",payload)
        dispatch(updateUserRole(id,token,payload));

    }
    console.log("user",user)
  return (
   <>
   <div className={styles.dashboard}>
    <SideBar />
    <div className={styles.newProductContainer}>
    {isLoading?(<Loader />):(
        <form
        className={styles.createProductForm}
        onSubmit={updateUserSubmitHandler}
        >
            <h1>Update User</h1>
            <div>
                <Person />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <VerifiedUser />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <Button
                id="createProductBtn"
                className={styles.createProductBtn}
                type="submit"
                disabled={
                  isLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
        </form>
    )}

    </div>
   </div>
   </>
  )
}

export default UpdateUser
