import React, {useEffect, useState} from "react";

const Order = () => {

    const [cartItem, setCartItem] = useState([])


    useEffect(() => {
        if (cartItem.length === 0) {
            setCartItem(JSON.parse(localStorage.getItem('my_cart_values')))
            console.log(cartItem)
        }
    }, [])


    return (
        <div className="container">
            <h1 style={{textAlign: 'center', paddingBottom: '5rem'}}>Order Summary</h1>
            {cartItem.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className='row justify-content-md-center'>
                                <div className="col-4">
                                    <ul className="list-group">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            {item.product}
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-4">
                                    <ul className="list-group">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            {item.quantity}
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-4">
                                    <ul className="list-group">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            {item.price}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>


                    )
                }
            )}
        </div>
    )
}
export default Order