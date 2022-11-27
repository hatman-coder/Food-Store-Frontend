import React, {useState} from "react";
import axios from "axios";
import Navigation from "../header/Navigation";
import Product from "./Products";

const Login = () => {
    const jwt = localStorage.getItem('jwt')
    const jwtExist = jwt === undefined
    const [loggedIn, setLoggedIn] = useState(jwtExist)

    const Signin = () => {
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value

        let postObject = {
            'email': email,
            'password': password
        }

        axios.post("http://127.0.0.1:8000/token/", postObject)
            .then(res => {
                if (res.data.access) {
                    localStorage.setItem('jwt', res.data.access)
                    setLoggedIn(true)

                } else {
                    console.log('No response found')
                }
            })
            .catch(err => console.log(err))

    }


    const renderHtml = () => {
        if (loggedIn === false & !localStorage.getItem('jwt')) {
            return (
                <div className="container">
                    <h1>Login</h1>
                    <div className='col-4'>
                        <input type="email" id="email"/>
                        <label className="form-label">Email address</label>
                    </div>

                    <div className='col-4'>
                        <input type="password" id="password"/>
                        <label className="form-label">Password</label>
                    </div>
                    <div className='col-4'>
                        <button type="button" onClick={() => Signin()} className="btn btn-primary">Sign in</button>
                    </div>

                </div>
            )
        } else {
            return (
                <>
                    <Navigation login_status={loggedIn}/>
                    <Product/>
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
