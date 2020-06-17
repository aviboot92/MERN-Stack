import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import {login} from './../../actions/auth';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons';

const Login = ({login, isAuthenticated}) => {

    const [formData,
        setFormData] = useState({ email: '', password: ''});

    const {email, password} = formData;

    const onChangeHandler = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    }

    // Redirect if logged in
    if(isAuthenticated){
        return <Redirect to='dashboard'/>
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
            <FontAwesomeIcon icon={faUser}/>
               {`  `} Sign in to your account</p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        onChange={onChangeHandler}
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        name="email"
                        required/>
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
                <input type="submit" className="btn btn-primary" value="Sign In"/>
            </form>
            <p className="my-1">
                Don't have an account?
                <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
};

Login.protoTypes ={
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state =>{
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = {login}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
