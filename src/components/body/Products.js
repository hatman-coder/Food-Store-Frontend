import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import './style/style.css'


const Product = () => {

    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const myArray = useRef([])

    const loadAllProducts = () => {
        axios.get('http://127.0.0.1:8000/product/').then((res) => {
            if (res.error) {
                setError(res.error)
                console.log(error)
            } else {
                setData(res.data)
            }

        })
    }

    useEffect(() => {
        loadAllProducts()
        // eslint-disable-next-line
    }, [])


    const CheckBoxHandler = (e) => {
        myArray.current.push(e.target.value)

    }


    const ButtonHandler = (e) => {
        // console.log({id: e.id, product: e.name, get_add_ones: myArray.current.join(',')})

        let existing = localStorage.getItem("my_cart_values")
        let existing_items


        if (existing !== null) {
            existing_items = JSON.parse(existing)
        } else {
            existing_items = []
        }

        if (!existing_items.some(item => item.id === e.id)) {

            existing_items.push({
                'id': e.id,
                'product': e.name,
                'image': e.img,
                'price': e.price,
                'get_add_ones': myArray.current,
                'quantity': 1
            })
        } else {
            alert('This item already added in the cart')
        }

        localStorage.setItem("my_cart_values", JSON.stringify(existing_items))


        myArray.current.splice(0, myArray.current.length)
        let get_checked_items = document.getElementsByClassName('form-check-input')
        for (let item of get_checked_items) {
            item.checked = false
        }

    }


    return (
        <div className='container divBody'>
            <div className='row justify-content-md-center'>
                {data.map((item, index) => {
                    return (
                        <div key={index}
                             className='col-lg-4 col-md-6 col-sm-12 col-xs-12 align-self-center text-center d-flex justify-content-center'>
                            <div className="card text-white mb-4">
                                <img className="card-img-top" src={item.img} alt="Unavailable"/>
                                <div className="card-body transbox">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">Price: {item.price}</p>
                                    <div className='checkBox'>
                                        {item.addons.map((getAddons, index) => {
                                            return (
                                                <div key={index} className='form-check form-check-inline'>
                                                    <input className='form-check-input'
                                                           onClick={CheckBoxHandler} type='checkbox' value={getAddons}
                                                    />
                                                    <label htmlFor='inlineCheckbox'>{getAddons}</label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <br></br>
                                    <br></br>
                                    <div className='card-footer'>
                                        <button className="myButton" onClick={() => ButtonHandler(item)}>Add to Cart
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" fill="white" class="bi bi-cart-plus" viewBox="0 0 16 16">
                                                    <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                                                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                                </svg> */}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>


    )
}


export default Product