
import React, { Fragment, useState } from 'react'
import {  useSelector } from 'react-redux'

import CheckoutStep from './checkoutStep';
import MetaData from '../Layout/MetaData';
import { Link,useNavigate } from 'react-router-dom';


const ConfirmOrder = () => {
    const Navigate=useNavigate();
    const {cartItems,shippingInfo}=useSelector(state=>state.cart)
    const {user}=useSelector(state=>state.auth)

    const itemsPrice=cartItems.reduce((acc,item)=>acc+item.price*item.quantity,0)
    const shippingPrice=itemsPrice>10?10:25
    const taxprice=Number((0.05*itemsPrice).toFixed(2))
    const totalPrice=(itemsPrice+shippingPrice+taxprice).toFixed(2);
 const proceedToPayment=()=>{
     const data={
         itemsPrice:itemsPrice.toFixed(2),
         shippingPrice,
         taxprice,
         totalPrice
     }
     sessionStorage.setItem('orderInfo',JSON.stringify(data))
     Navigate('/payment')

 }

  return (
    <Fragment>
         <MetaData title={`Confirm Order`}></MetaData>
        <CheckoutStep shipping confirmOrder></CheckoutStep>
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-confirm">
                {console.log(user,shippingInfo)}
                <h4 className="mb-3">Shipping Info</h4>
                <p><b>Name: </b> {user && user.name}</p>
                <p><b>Phone: </b>{shippingInfo.phoneNo}</p>
                <p className="mb-4"><b>Address:   {`${shippingInfo.address},${shippingInfo.city},${shippingInfo.postalCode},${shippingInfo.country}`}</b></p>
                
                <hr />
                <h4 className="mt-4">Your Cart Items: </h4>
                    {cartItems.map(item=>(
                      <Fragment>
                            <hr />
                            <div className="cart-item my-1">
                    <div className="row">
                        <div className="col-4 col-lg-2">
                            <img src={item.image}alt="Laptop" height="45" width="65" />
                        </div>

                        <div className="col-5 col-lg-6">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>


                        <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                            <p>{item.quantity}x {item.price} = <b>{item.quantity*item.price}</b></p>
                        </div>

                    </div>
                </div>
                      </Fragment>  
                    ))}
                
                
                <hr />

            </div>
			
			<div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">{itemsPrice}</span></p>
                        <p>Shipping: <span className="order-summary-values">{shippingPrice}</span></p>
                        <p>Tax:  <span className="order-summary-values">{taxprice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">{totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" className="btn btn-primary btn-block" onClick={proceedToPayment}>Proceed to Payment</button>
                    </div>
                </div>
			
			
        </div>
    </Fragment>
  )
}

export default ConfirmOrder