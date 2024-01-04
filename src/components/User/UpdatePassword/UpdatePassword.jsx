import React, { useState } from 'react'
import styles from "./UpdatePassword.module.css"
import { Face, MailOutline, Password } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../../Redux/UserDataReducer/action';
import { UPDATE_PASSWORD_SUCCESS } from '../../../Redux/UserDataReducer/actionTypes';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UpdatePassword = () => {
    const { token } = useSelector((state) => state.AuthReducer)
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const updatePasswordSubmit = () => {
        if (oldPassword && newPassword && confirmPassword) {
            const payload = {
                oldPassword: oldPassword,
                newPassword: newPassword,
                confirmPassword: confirmPassword
            }
            dispatch(updatePassword(payload, token)).then((res) => {
                if (res === UPDATE_PASSWORD_SUCCESS) {
                    toast.success("Password update successfully!", {
                        position: toast.POSITION.TOP_CENTER
                    })
                    navigate("/login-signUp", { replace: true })
                }
                else {
                    toast.warning("Something went wrong!", {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
            })
        }
    }

    return (
        <>
            <Navbar />
            <div className={styles.updatePasswordContainer}>
                <div className={styles.updatePasswordBox}>
                    <h2 className={styles.updatePasswordHeading}>Update Password</h2>
                    <form
                        className={styles.updatePasswordForm}

                        onSubmit={updatePasswordSubmit}
                    >
                        <div className={styles.updatePasswordEmail}>
                            <Password />
                            <input
                                type="password"
                                placeholder='Old Password'
                                required
                                name='email'
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />

                        </div>
                        <div className={styles.updatePasswordOldPassword}>
                            <Password />
                            <input
                                type="password"
                                placeholder='New Password'
                                required
                                name='newPassword'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles.updatePasswordNewPassword}>
                            <Password />
                            <input
                                type="password"
                                placeholder='confirm Password'
                                required
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Update"
                            className={styles.updatePasswordBtn}
                        />

                    </form>

                </div>

            </div>
            <Footer />
        </>
    )
}

export default UpdatePassword
