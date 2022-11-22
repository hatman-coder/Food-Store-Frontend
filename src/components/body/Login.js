import React from "react";
import axios from "axios";

const Login = () => {

    const headers = {
        'Content-Type': 'application/json;charset=UTF-8'
    }

    const Signin = (e) => {
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        let postObject = {  'email': email,
                            'password': password
                         }

        console.log(postObject)
        axios.post("http://127.0.0.1:8000/token/", postObject)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <h1>Login</h1>
                <div className="form-outline mb-4">
                    <input type="email" id="email" className="form-control" />
                    <label className="form-label" >Email address</label>
                </div>

                <div className="form-outline mb-4">
                    <input type="password" id="password" className="form-control" />
                    <label className="form-label" >Password</label>
                </div>
                <button type="button" onClick={() => Signin()} className="btn btn-primary row mb-4">Sign in</button>
        </div>
)
}

export default Login
