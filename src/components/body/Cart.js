import React, { useEffect, useState } from "react";
import './style/cart.css'


const Cart = () => {

   const [data, setData] = useState([])

   const Total = (e) => {
    let price = parseInt(document.getElementById('price').innerHTML)
    let quantity = parseInt(document.getElementById('number').innerHTML)
    let total = price * quantity
    let result = document.getElementById('total').innerHTML = total
    return result
}

   const MinusHandle = (e) =>{

        let number = parseInt(document.getElementById('number').innerHTML)
        if (number !== 1){
            number -= 1
        }
        document.getElementById('number').innerHTML = number  
        Total()
        }
        

    const PlusHandle = (e) =>{
        let number = parseInt(document.getElementById('number').innerHTML)
        number += 1
        document.getElementById('number').innerHTML = number
        Total()
    }

    const DeleteHandle = (e) =>{
        const items = JSON.parse(localStorage.getItem('my_cart_values'))
        const filtered = items.filter(item => item.id !== e)
        localStorage.setItem('my_cart_values', JSON.stringify(filtered))
        window.location.reload()
       
    }

   useEffect(() => {
    if(data.length === 0 ){
        let get_data = JSON.parse(localStorage.getItem("my_cart_values"))
        if(get_data){
            setData(get_data)
        }
        else{
            console.log('else', data)
        }
        
    }
    },[])



    return(
        <div className="container">
            <table className="table">
            <thead>
                <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">total</th>
                </tr>
            </thead>
            {data.map((item, index) => {
              if(!data.length){
                
                return(
                        <h1 style={{color: 'black'}}>
                            Your cart is empty
                        </h1>   
                )
              }
              if(data.length > 0){
                
                return(
                        <tbody key={index}>
                            <tr>
                                <td>
                                    <img src={item.image} alt='unavailable' style={{width:'60px', height:'45px'}}/>
                                </td>
                                <td>
                                    {item.product}
                                </td>
                                <td id="price">
                                    {item.price}
                                </td>
                                <td>
                                    <p id="number" >1</p>
                                    <button id="minus" onClick={MinusHandle} value={item.id}>-</button> <span></span>
                                    <button id="plus" onClick={PlusHandle} value={item.id}>+</button>
                                </td>

                                <td id="total">
                                    {item.price}
                                </td>
                                <td >
                                    <button onClick={() => DeleteHandle(item.id)}>Delete</button>
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