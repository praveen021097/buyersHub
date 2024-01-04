import React, { useState, useEffect }  from 'react'
import {useDispatch, useSelector} from "react-redux";
import SideBar from './SideBar'
import Loader from '../../components/Loader/Loader';
import { MailOutline, Person, VerifiedUser } from '@mui/icons-material';
import { getSingleUser, updateUserRole } from '../../Redux/UserDataReducer/action';
import {Button} from "@mui/material";
import {useParams} from "react-router-dom";
import styles from "./UpdateUser.module.css";
import { UPDATE_USER_ROLE_SUCCESS } from '../../Redux/UserDataReducer/actionTypes';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
import MetaData from '../../components/MetaData/MetaData';
const UpdateUser = () => {
    const {isLoading, user} = useSelector((state)=>state.UserDataReducer);
    const { token } = useSelector((state) => state.AuthReducer);
    const dispatch = useDispatch();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [role, setRole] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
      if (user && user._id !== id) {
        dispatch(getSingleUser(id,token));
      } else {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      }
    },[dispatch,user,id,token]);

    const updateUserSubmitHandler =(e)=>{
        e.preventDefault();
        const payload ={
          name:name,
          email:email,
          role:role
        }

       
        dispatch(updateUserRole(id,token,payload)).then((res)=>{
          if(res === UPDATE_USER_ROLE_SUCCESS){
            toast.success("updated successfully",{
              position:toast.POSITION.TOP_CENTER
            })
            navigate("/admin/users",{replace:true})
          }
          else{
            toast.warning("something went wrong!",{
              position:toast.POSITION.TOP_CENTER
            })
          }
        });

    }
    console.log("user",user)
  return (
   <>
   <MetaData title={"Update user"} />
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
