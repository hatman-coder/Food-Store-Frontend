import React, {useEffect, useState} from "react";
import "./style/order.css"
import jwt_decode from "jwt-decode";
import axios from "axios";
import Login from "./Login";




const Order = () => {

    const [cartItem, setCartItem] = useState([])

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
            let product = parseInt(item.id)
            let addOns = item.get_add_ones.toString()
            return(
                {
                    "id": item.id,
                    "user": decoded.user_id,
                    "products": product,
                    "customer": {
                        "deliveryAddress": document.getElementById('deliveryAddress').value,
                        "phone": document.getElementById('phone').value,
                        "paymentType": document.getElementById('payment').value
                    },
                    "addOns": addOns,
                    "quantity": item.quantity
                }
            )
        })
       
        
        if(decoded.user_id !== null && document.getElementById('phone').value !== ''){
            for(let i=0; i<dataForm.length; i++){
                axios.post('http://127.0.0.1:8000/order/', dataForm[i])
                .then(res => console.log(res.data))
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


    return (
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
                            <input type='text' id="deliveryAddress" className="form-control" placeholder="Delivery Address" style={{height: '100px'}}></input>
                        </div>
                            &nbsp;
                        <div className="form-group">
                            <input type='text' id="phone" className="form-control" placeholder="Phone Number"></input>
                        </div>
                            &nbsp;
                        <div className="form-group">
                            <label htmlFor="payment">
                                    Choose Payment Type
                            </label>
                            &nbsp;
                            <select name="payment-method" id="payment">
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
    )
}
export default Order