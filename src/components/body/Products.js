import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Product = () => {

    const [data, setData] = useState(0)
    const [error, setError] = useState(0)

    const loadAllProducts = () => {
        axios.get('http://127.0.0.1:8000/product/').then( (res) => {
            if(res.error){
                setError(res.error)
                console.log(error)
            }
            else {
                setData(res.data)
                console.log(res.data)
            }
            
            
        })
    }
    useEffect(() => {loadAllProducts()}, [])

    return(
      
        <div className="container">
           Hello
        </div>
        
    );
}

export default Product