import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function Register() {

    const [formData,
        setFormData] = useState({name: '', email: '', password: '', password2: ''});

    const {name, email, password, password2} = formData;

    const onChangeHandler = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            console.log('Password mismatch')
        } else {
            // const newUser = {
            //     name,
            //     email,
            //     password
            // };

            // try {
            //     const config = {
            //         headers:{
            //             'Content-Type': 'application/json'
            //         }
            //     }
            //     const body = JSON.stringify(newUser);
            //     const res = await axios.post('/api/users', body, config);
            //     console.log(res.data);
            // } catch (error) {
            //     console.log(error.response)
            // }
            console.log('Success');
        }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"></i>
                Create Your Account</p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        required/>
                </div>
                <div className="form-group">
                    <input
                        onChange={onChangeHandler}
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        name="email"
                        required/>
                    <small className="form-text">This site uses Gravatar so if you want a profile
                        image, Please create an account in the Gravatar with same email</small>
                </div>
                <div className="form-group">
                    <input
                        onChange={onChangeHandler}
                        type="password"
                        placeholder="Password"
                        value={password}
                        name="password"
                        required
                        minLength="8"/>
                </div>
                <div className="form-group">
                    <input
                        onChange={onChangeHandler}
                        type="password"
                        placeholder="Confirm Password"
                        value={password2}
                        name="password2"
                        required
                        minLength="8"/>
                </div>
                <input type="submit" className="btn btn-primary" value="Register"/>
            </form>
            <p className="my-1">
                Already have an account?
                <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}
