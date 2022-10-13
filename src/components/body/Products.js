import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";


const Product = () => {

    const [data, setData] = useState([])
    const [error, setError] = useState('')
    

    const loadAllProducts = () => {
        axios.get('http://127.0.0.1:8000/product/').then( (res) => {
            if(res.error){
                setError(res.error)
                console.log(error)
            }
            else {
                setData(res.data)

            }   
   
        })
    }
    // eslint-disable-next-line
    useEffect(() => {loadAllProducts()}, [])


    const ButtonHandler = (e) => {
    
        return  console.log({id: e.id, product: e.name})
        
    }

    const CheckBoxHandler =() => {
        return console.log('CheckBox Clicked')
    }

    return (
        <div >
                {data.map((item, index )=> 
                    {
                        return(
                            <div className="container" key={index} style={{alignItems: 'center', display: 'block', alignSelf: 'center'}}>
                                <div className="row" >
                                    <div className="col-6">
                                        <img src={item.img} alt='Cannot Load Property' style={{ maxWidth:'300px',paddingTop: '5px', maxHeight: '160px', minWidth: '250px'}}/>
                                        <h2 style={{fontSize: '1.5rem'}}>{item.name}</h2>
                                        <b><p style={{color: 'red', fontWeight: '3rem'}}>Price: {item.price}</p></b>
                                        {item.addOnes.map((item, index )=> {
                                            return(
                                                <div key={index} className="form-check form-check-inline">
                                                    <input className="form-check-input" onClick={() => {CheckBoxHandler()}} type="checkbox" id="inlineCheckbox}" value="option" />
                                                        <label htmlFor="inlineCheckbox" className="form-check-label">{item}</label>
                                                </div>
                                            )
                                        })}
                                        <br></br>
                                        <br></br>
                                        <button style={{height: '40px', width: '150px'}} type="submit" onClick={() => ButtonHandler(item)} className="btn btn-dark">Add to cart</button>
                                        <br></br>
                                        <br></br>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}
    
        </div>
     
    )
}


export default Product