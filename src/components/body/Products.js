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


    // const CheckBoxHandler = (e) => {
    //     myArray.current.push(e.target.value)

    // }



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
                'add_ons': myArray.current,
                'quantity': 1,
                'category' : e.category
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
                                    <br></br>
                                    <p className="card-text">Price: ${item.price}</p>

                                    {/* <div className='checkBox' id="category" value={item.category}>
                                        <label htmlFor='inlineCheckbox'>{CategoryHandler}
                                            </label>

                                    </div> */}
    
                                       
                                         {/* <div  className='form-check form-check-inline'>
                                          <input className='form-check-input'
                                                    onClick={CheckBoxHandler} type='checkbox' 
                                             /> 
                                            </div>
                                                 <label htmlFor='inlineCheckbox'>{CategoryHandler}</label> */}
                                         
                                     <br></br>            
                                    <div className='card-footer border-top-0'>
                                        <button className="myButton" onClick={() => {
                                            ButtonHandler(item)
                                        }}>
                                            Add to Cart
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