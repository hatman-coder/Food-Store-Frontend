import React, {useEffect, useState} from "react";
import "./style/order.css"
import jwt_decode from "jwt-decode";
import axios from "axios";
import Login from "./Login";
import OrderSummary from "../OrderSummary";
import { Link, redirect } from "react-router-dom";




const Order = () => {

    const [cartItem, setCartItem] = useState([])
    const [success, setSuccess] = useState(false)

    let get_data = localStorage.getItem('jwt')

    var token = get_data
    
    if (token){
        var decoded = jwt_decode(token);
    }
    else{
        var decoded = {
            'user_id': null
        }
        console.log('Not logged in')
    }
    

    useEffect(() => {
        if (cartItem.length === 0) {
            setCartItem(JSON.parse(localStorage.getItem('my_cart_values')))
        }
    }, [])

    
    const DataHandle = () => {
        let data = JSON.parse(localStorage.getItem('my_cart_values'))
        
        let dataForm = data.map(item => {
            let product_id = parseInt(item.id)
            let add_ons = item.add_ons.toString()
            return(
                {
                "order_master_id": {
                    "customer_detail": {
                        "delivery_address": document.getElementById('delivery_address').value,
                        "contact_number": document.getElementById('contact_number').value,
                        "payment_type": document.getElementById('payment_type').value,
                        "user_id": decoded.user_id
                    },
                "user_id": decoded.user_id,
                },
                "price": item.price,
                "add_ons": add_ons,
                "quantity": item.quantity,
                "product_id": product_id,
                }
            )
        })
       
        
        if(decoded.user_id !== null && document.getElementById('contact_number').value !== '' && localStorage.getItem('my_cart_value') !== undefined){
            for(let i=0; i<dataForm.length; i++){
                axios.post('http://127.0.0.1:8000/orderDetail/', dataForm[i])
                .then(res => {
                    if(res.status === 201){
                        setSuccess(true)
                    }
                    <OrderSummary get_id={res.data.id} />
                    console.log('res', res)
                    console.log('data', res.data)
                })
                .catch(err => console.log(err))
            }
            
        }

        else{
            console.log('Login First')
    
        }
            
      
    
        
    }

    const Total = () => {
        let x = cartItem.map(item => {
            return item
        })
        var sum = 0
        for (let i=0; i<x.length; i++){
            sum = parseInt(sum) + parseInt(x[i].price) * parseInt(x[i].quantity)
           
        }

    return sum  

    }

    const renderHtml = () => {
        if(success === false){
            return(
                <>
                    <div className="container text-center" style={{fontFamily: 'monospace'}}>
            <h1 style={{textAlign: 'center', paddingBottom: '5rem'}}>Checkout</h1>

            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12 ">
                        <div className="container-fluid custom-col1" style={{border: '1px solid gray',backgroundColor:'wheat', paddingTop:'0%'}}>
                        <p style={{borderBottom: '1px solid gray', color: 'black', fontSize: '2rem', paddingBottom: 'none'}}>
                            Order detail
                        </p>
                        <div>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col"><p style={{textAlign: 'left'}}>Item</p></th>
                                <th scope="col"><p style={{textAlign: 'left'}}>Quantity</p></th>
                            
                            </tr>
                        </thead>
                            {cartItem.map((item, index) => {
                                return(
                                    <tbody key={index}>
                                   <tr>
                                        <td>
                                            <p style={{textAlign: 'left'}}>{item.product} </p>
                                        </td>
                                        <td>
                                            <p style={{textAlign: 'center'}}>{item.quantity}</p>
                                        </td>
                                   </tr>
                                   </tbody>
                                )
                            })}
                            </table>
                            
                        </div>
                        <div className="footer">
                            <p style={{fontStyle: 'inherit'}}><b>Total: ${Total()}</b></p>
                        </div>
                        </div>
                        
                   
                </div>

                <div className="col-lg-8 col-md-6 col-sm-12 custom-col2 mybody">
                    <div className="container-fluid custom">
                        <h1 style={{textAlign: 'center', paddingBottom: '3rem', fontSize: '2rem'}}>Info</h1>
                        <div className="form-group">
                            <input type='text' id="delivery_address" className="form-control" placeholder="Delivery Address" style={{height: '100px'}}></input>
                        </div>
                            &nbsp;
                        <div className="form-group">
                            <input type='text' id="contact_number" className="form-control" placeholder="Contact Number"></input>
                        </div>
                            &nbsp;
                        <div className="form-group">
                            <label htmlFor="payment">
                                    Choose Payment Type
                            </label>
                            &nbsp;
                            <select name="payment-method" id="payment_type">
                                <option value="Bkash">Bkash</option>
                                <option value="Rocket">Rocket</option>
                                <option value="Cash On Delivery">Cash On Delivery</option>
                            </select>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className="custom-btn">
                            <button type="button" onClick={() => DataHandle()} className="btn btn-success">
                                Confirm
                            </button>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
                </>
            )
        }

        else{
            // localStorage.removeItem('my_cart_values')
            return(
                <>
                    <div className="text-center large-centered columns">
                        <h1>
                            Order complete
                        </h1>
                        
                    </div>
                </>
            )
       
        }
    }


    return (
        <>
            {renderHtml()}
        </>
    )
}
export default Order