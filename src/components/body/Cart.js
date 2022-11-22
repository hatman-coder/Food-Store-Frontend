import React, {useEffect, useState} from "react";
import './style/cart.css'


const Cart = () => {

    const [data, setData] = useState([])


    const Total = (e) => {
        // let price = parseInt(document.getElementById('price').innerHTML)
        // let quantity = parseInt(document.getElementById('number').innerHTML)
        // let total = price * quantity
        // let result = document.getElementById('total').innerHTML = total
        // return result

    }


    const MinusHandle = (cartId) => {
        const new_dataset =  data.map(element => element.id == cartId && element.quantity > 1 ?
            { ...element, quantity: element.quantity - 1 }
            : element)

        setData(new_dataset)

        localStorage.setItem("my_cart_values", JSON.stringify(new_dataset))

    }

    const PlusHandle = (cartId) => {
        console.log(cartId)
        const new_dataset = data.map(element=>{
            if (element.id === cartId){
                return {
                    ...element,
                    quantity: element.quantity +1
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
            } else {
                console.log('else', data)
            }

        }
    }, [])


    return (
        <div className="container">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Item</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col">Delete</th>
                </tr>
                </thead>
                {data.map((item, index) => {
                        if (!data.length) {

                            return (
                                <h1 style={{color: 'black'}}>
                                    Your cart is empty
                                </h1>
                            )
                        }
                        if (data.length > 0) {

                            return (
                                <tbody key={index}>
                                <tr>
                                    <td>
                                        <img src={item.image} alt='unavailable' style={{width: '60px', height: '45px'}}/>
                                    </td>
                                    <td>
                                        {item.product}
                                    </td>
                                    <td id="price">
                                        {item.price}
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
                    }
                )}

            </table>
        </div>
    )
}

export default Cart