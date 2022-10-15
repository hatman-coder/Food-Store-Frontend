import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import './style/style.css'


const Product = () => {

    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const myarray = useRef([])

    // eslint-disable-next-line
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

    // eslint-disable-next-line
    useEffect(() => {
        loadAllProducts()
    }, [])


    // eslint-disable-next-line
    var a = []
    const CheckBoxHandler = (e) => {
        console.log(e.target.value)
        myarray.current.push(e.target.value)
    }

    // eslint-disable-next-line
    const ButtonHandler = (e) => {
        return console.log({id: e.id, product: e.name, get_add_ones: myarray.current.join(',')})
    }


    return (
        <div className='container divBody'>
            <div className='row row-centered pos'>
                {data.map((item, index) => {
                    return (
                        <div key={index} className='col-lg-4 col-md-8 col-sm-12 text-center'
                             style={{maxWidth: '480px'}}>
                            <div className="card text-white  mb-3 ">
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
                                        <button className="myButton" onClick={() => ButtonHandler(item)}>Add To Cart
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