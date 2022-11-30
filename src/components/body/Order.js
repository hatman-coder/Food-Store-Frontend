import React, {useEffect, useState} from "react";
import "./style/order.css"


const Order = () => {

    const [cartItem, setCartItem] = useState([])


    useEffect(() => {
        if (cartItem.length === 0) {
            setCartItem(JSON.parse(localStorage.getItem('my_cart_values')))
        }
    }, [])

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
        <div className="container text-center">
            <h1 style={{textAlign: 'center', paddingBottom: '5rem'}}>Order Summary</h1>

            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12 ">
                        <div className="container-fluid custom-col" style={{border: '1px solid gray',backgroundColor:'wheat', paddingTop:'0%'}}>
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

                <div className="col-lg-8 col-md-6 col-sm-12 custom-col">
                    <div className="container-fluid custom">
                        <h1 style={{textAlign: 'center', fontSize: '20px', paddingBottom: '3rem', fontSize: '2rem'}}>Info</h1>
                        <div className="form-group">
                            <input type='text' className="form-control" placeholder="Delivery Address" style={{height: '100px'}}></input>
                        </div>
                            &nbsp;
                        <div className="form-group">
                            <input type='text' className="form-control" placeholder="Phone Number"></input>
                        </div>
                            &nbsp;
                        <div className="form-group">
                            <label htmlFor="payment">
                                    Choose Payment Type
                            </label>
                            &nbsp;
                            <select name="payment-method" id="payment">
                                <option value="bkash">Bkash</option>
                                <option value="rocket">Rocket</option>
                                <option value="cashOnDelivery">Cash On Delivery</option>
                            </select>
                        </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className="custom-btn">
                            <button type="button" className="btn btn-success">
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