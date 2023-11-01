import React, { useState } from 'react'
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../Redux/CartReducer/actions';
import { PinDrop, Home, LocationCity, Public, Phone, TransferWithinAStation } from '@mui/icons-material';
import { Country, State } from "country-state-city"
import styles from "./ShippingInfo.module.css"
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import CheckoutSteps from './CheckoutSteps';
import { useNavigate } from 'react-router-dom';
const ShippingInfo = () => {
    const dispatch = useDispatch();
    const { shippingInfo } = useSelector((state) => state.CartReducer)
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);
    const navigate = useNavigate()
    const shippingSubmit = (e) => {
        e.preventDefault();
        if(phoneNumber.length < 10 ||  phoneNumber.length > 10){
            return ;
        }
        dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNumber }))
        navigate("/confirm-order",{replace:true})
    }

    return (
        <>
             <CheckoutSteps  activeStep={0}/>
            <div className={styles.shippingContainer}>
           
                <div className={styles.shippingBox}>
                    <h2 className={styles.shippingHeading}>
                        Shipping Details
                    </h2>
                    <form
                        className={styles.shippingForm}
                        encType='multipart/form-data'
                        onSubmit={shippingSubmit}
                    >
                        <div>
                            <Home />
                            <input type="text"
                                placeholder='Address'
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div>
                            <LocationCity />
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div>
                            <PinDrop />
                            <input
                                type="number"
                                placeholder="Pin Code"
                                required
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>
                        <div>
                            <Phone />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                size="10"
                            />
                        </div>
                        <div>
                            <Public />
                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country && Country.getAllCountries().map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        {country && (
                            <div>
                                <TransferWithinAStation />
                                <select
                                    value={state}
                                    required
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {
                                        State && State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        )}
                        <input type="submit"
                            value={"Continue"}
                            className={styles.shippingBtn}
                            disabled={state ? false : true} />
                    </form>
                </div>
            </div>
        </>
    )
}

export default ShippingInfo
