import React, { useEffect, useState } from 'react';
import styles from "./UpdateUserProfile.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { Face, MailOutline } from '@mui/icons-material';
import { updateProfile } from '../../../Redux/UserDataReducer/action';
import { UPDATE_PROFILE_SUCCESS } from '../../../Redux/UserDataReducer/actionTypes';
import { userInformation } from '../../../Redux/AuthReducer/action';
import { useNavigate } from 'react-router-dom';


const UpdateUserProfile = () => {
    const dispatch = useDispatch();
    const {token,userDetails} = useSelector((state)=>state.AuthReducer);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [avatar,setAvatar] = useState();
    const [avatarPreview,setAvatarPreview] = useState("/Profile.png")
    const navigate = useNavigate()
  useEffect(()=>{
    dispatch(userInformation())
  },[dispatch])
  console.log("token",userDetails)
    const updateProfileSubmit = (e) => {
        e.preventDefault();
       if(name && email && avatar){
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        
        
        dispatch(updateProfile(myForm,token)).then((res)=>{
            if(res === UPDATE_PROFILE_SUCCESS){
               navigate("/me",{replace:true})
            }
        })
       }

    }

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();
    
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };
    
        reader.readAsDataURL(e.target.files[0]);
      };


  return (
    <>
    <div className={styles.updateProfileContainer}>
        <div className={styles.updateProfileBox}>
            <h2 className={styles.updateProfileHeading}>Update Profile</h2>
            <form 
            className={styles.updateProfileForm}
            encType='multipart/form-data'
            onSubmit={updateProfileSubmit}
            >
                <div className={styles.updateProfileName}>
                    <Face />
                    <input 
                     type="text"
                     placeholder='Name'
                     required
                     name='name'
                     value={name}
                     onChange={(e)=> setName(e.target.value)}
                     />

                </div>
                <div className={styles.updateProfileEmail}>
                    <MailOutline />
                    <input 
                    type="text"
                    placeholder='Email'
                    required
                    name='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div id="updateProfileImage" className={styles.updateProfileImage}>
                  <img src={userDetails.avatar.url} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className={styles.updateProfileBtn}
                />

            </form>

        </div>

    </div>
    </>
  )
}

export default UpdateUserProfile
