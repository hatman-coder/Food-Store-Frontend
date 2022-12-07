import axios from "axios";
import React, { useEffect, useState } from "react";

const OrderSummary = (get_id) => {

    const [data, setData]  = useState([])

    const ApiData = () => {
        axios.get("http://127.0.0.1:8000/order/")
        .then( res => {
            setData(res.data)
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    useEffect(() =>{
        ApiData()
    }, [])


    return(
        <>
            {data.map((item, index) => {
                return(
                  
                        <div key={index}>
                            <div>
                                
                            </div>
                        </div>
                  
                )
            })}
        </>
    )
}

export default OrderSummary