import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import './style/cart.css'


const Cart = (addOns) => {

    const [data, setData] = useState([])
    const [category, setCategory] = useState([])
    const [add_ons, setAdd_ons] = useState([])
    


    const renderHtml = () => {
        if (data.length === 0) {
            return (
                <div className='container'>
                    <div className="large-10 text-center large-centered columns">
                        <img src='empty_cart.png' alt="cartImg"/>
                    </div>
                    <br></br><br></br><br></br>
                    <div className="text-center large-centered columns">
                        <h1>Your cart is empty !</h1>
                    </div>
                </div>
            )
        } else {
          
            return (
                <div className='container'>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">AddOns</th>
                            <th scope="col">Item</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total</th>
                            <th scope="col">Delete</th>
                        </tr>
                        </thead>
                        {data.map((item, index) => {

                                return (
                                    <tbody key={index}>
                                    <tr>
                                        <td>
                                            <img src={item.image} alt='unavailable'
                                                 style={{width: '60px', height: '45px'}}/>
                                        </td>
                                        <td>
                                            {item.product}
                                        </td>
                                        <td id="price">
                                            {item.price}
                                        </td>
                                        <td>
                                            <div  className='form-check form-check-inline'>
                                                <input className='form-check-input' type='checkbox'/> 
                                            </div>
                                            <label htmlFor='inlineCheckbox'>{item.add_ons}</label>
                                        </td>
                                        <td>
                                            <p>{item.quantity}</p>
                                        </td>

                                    

                                        <td>
                                            <button id="minus" className="btn1" onClick={() => MinusHandle(item.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16"
                                                     fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                </svg>
                                            </button>
                                            &nbsp;
                                            &nbsp;
                                            &nbsp;
                                            <button id="plus" className="btn2" onClick={() => PlusHandle(item.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16"
                                                     fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                                    <path
                                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                </svg>
                                            </button>
                                        </td>


                                        <td>
                                            {item.price * item.quantity}
                                        </td>

                                        <td>
                                            <button className="btn3" onClick={() => DeleteHandle(item.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path
                                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                    <path fillRule="evenodd"
                                                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                </svg>
                                            </button>
                                        </td>

                                    </tr>

                                    </tbody>

                                )
                            }
                        )}

                    </table>
                    <div className="text-center large-centered columns">
                        <button className='btn4'>
                            <a href='/order' style={{color: 'white', textDecoration: 'none', fontWeight: '0.5rem'}}>
                                Proceed
                            </a>
                        </button>
                    </div>
                </div>
            )
        }
    }


    const MinusHandle = (cartId) => {
        const new_dataset = data.map(element => element.id === cartId && element.quantity > 1 ?
            {...element, quantity: element.quantity - 1}
            : element)

        setData(new_dataset)

        localStorage.setItem("my_cart_values", JSON.stringify(new_dataset))

    }

    const PlusHandle = (cartId) => {
        console.log(cartId)
        const new_dataset = data.map(element => {
            if (element.id === cartId) {
                return {
                    ...element,
                    quantity: element.quantity + 1
                }
            } else {
                return element
            }
        })


        // const new_dataset =  data.map(element => element.id == cartId ?
        //     { ...element, quantity: element.quantity + 1 }
        //     : element)

        setData(new_dataset)

        localStorage.setItem("my_cart_values", JSON.stringify(new_dataset))
    }

    const DeleteHandle = (e) => {
        const items = JSON.parse(localStorage.getItem('my_cart_values'))
        const filtered = items.filter(item => item.id !== e)
        localStorage.setItem('my_cart_values', JSON.stringify(filtered))
        window.location.reload()

    }

    useEffect(() => {
        if (data.length === 0) {
            let get_data = JSON.parse(localStorage.getItem("my_cart_values"))
            if (get_data) {
                setData(get_data)
                axios.get('http://127.0.0.1:8000/addOns/').
                then((res) => 
                {
                    setCategory(res.data) 
                     
                })
               
            } else {
                console.log('else', data)
            }
         

        }
    }, [])


    return (
        <div className="container">
            {renderHtml()}
            
        </div>
    )
}

export default Cart