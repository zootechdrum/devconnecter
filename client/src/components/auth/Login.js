import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
const Login = () => {

    const [formData, setFormData] = useState({
        email:'',
        password:'',

    });

    const {email, password} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        if(password !== password2){
            console.log("Success")
        }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="email" 
                    placeholder="Email Address" 
                    value={email} 
                    onChange={e => onChange(e)}
                    name="email"   
                    required/>  
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password} 
                        onChange={e => onChange(e)}
                        name="password"
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Doon't have an account? <a href="login.html">Sign In</a>
            </p>
        </Fragment>
    )
}

export default Login;