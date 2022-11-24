import React, { useState } from "react";
import axios from "axios";
import Navigation from "../header/Navigation";
import Product from "./Products";
import { redirect } from "react-router-dom";

const Login = () => {

    const [token, setToken] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)
    
    const Signin = () => {
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value

        let postObject = {  'email': email,
                            'password': password
                         }

        axios.post("http://127.0.0.1:8000/login/", postObject)
            .then(res => {
                if(res){
                    setToken(res.data)
                    setLoggedIn(true)
                }
            })
            .catch(err => console.log(err))
        localStorage.setItem('jwt', JSON.stringify(token.access))
    }

        
    const renderHtml = () => {
        if(loggedIn === false && !localStorage.getItem('jwt')){
            return(
                <div className="container">
                    <h1>Login</h1>
                    <div className='col-4'>
                        <input type="email" id="email" />
                        <label className="form-label" >Email address</label>
                    </div>
    
                    <div className='col-4'>
                        <input type="password" id="password" />
                        <label className="form-label" >Password</label>
                    </div>
                    <div className='col-4'>
                        <button type="button" onClick={() => Signin()} className="btn btn-primary">Sign in</button>
                    </div>
                    
                </div>
            )
        }
        else{
            return(
                <>  
                    <div><h1>logged In</h1></div>
                    <Navigation login_status={loggedIn}/>
                    <Product />
                </>
            )
        }
    }

    return (
        <>
            {renderHtml()}
        </>
    )
}
    

export default Login
