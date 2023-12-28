import React from 'react'
import  "./CheckoutSteps.css"
import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import { AccountBalance, LibraryAddCheck, LocalShipping } from '@mui/icons-material'


const CheckoutSteps = ({ activeStep }) => {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShipping />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheck />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalance />
        }
    ];
    
    const stepStyles = {
        boxSizing: "border-box",
    }
    return (
        <>
    
            <div className='checkoutStepContainer'>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {
                    steps.map((item, index) => (
                        <Step 
                        key={index} 
                        active={activeStep === index ? true : false}
                         completed={activeStep >= index ? true : false}
                         >
                            <StepLabel icon={item.icon} style={{"color":activeStep>=index?"teal":"tomato"}}>{item.label}</StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
            </div>
           
        </>
    )
}

export default CheckoutSteps
