import React, { useEffect, useState } from "react";
import './style/cart.css'


const Cart = () => {
   const [data, setData] = useState([])
   

   useEffect(() => {
    if(data.length === 0 ){
        let get_data = JSON.parse(localStorage.getItem("my_cart_values"))
        if(get_data){
            setData(get_data)
            console.log('if', get_data)
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
                                    <img src={item.image} style={{width:'60px', height:'45px'}}/>
                                </td>
                                <td>
                                    {item.product}
                                </td>
                                <td>
                                    {item.price}
                                </td>
                                <td>
                                    <input type='number' defaultValue='1' style={{width: '70px'}}></input>
                                </td>
                                <td>

                                </td>
                                <td>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
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