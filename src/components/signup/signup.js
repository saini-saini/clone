import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import TextError from './errorMessage'
import './signup.css'
import { useNavigate } from "react-router-dom";
import { SignupValidation } from '../formValidation/formValidation'
import spotify from '../../images/spotify.png'
import { useDispatch } from 'react-redux';
import { SignUpUserData } from '../../redux/userData/action'
import { persistor } from '../../redux/store';
const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (values) => {
        dispatch(SignUpUserData(values));
        navigate("/layout")
    }

    // const onSubmit = async (values) => {
    //     await dispatch(SignUpUserData(values)); 
    //     await persistor.flush();
    //     navigate('/layout');
    // };

  
    return (
        <div className='signup-container-wrapper'>
            <div className='signup-logo'>
                <img src={spotify} alt="spotifyLogo" className='spotify-logo' />
                <h2 style={{ color: "white", margin: "0px", cursor: "pointer" }}>Spotify</h2>
            </div>
            <Formik
                initialValues={{ username: '', email: '', number: '', password: '', confirmpassword: '' }}
                onSubmit={onSubmit}
                validationSchema={SignupValidation}>
                <div className='signup-container'>
                    <Form>
                        <div className='signup-form-wrapper'>
                            <h1 className='signup-heading'>Sign up to start <br />listening</h1>
                            <div className='form-input'>
                                <label className='label'>Username</label>
                                <Field type="text" name="username" placeholder="Enter username" className="input" autoComplete="off" />
                                <ErrorMessage name="username" component={TextError} />
                            </div>
                            <div className='form-input'>
                                <label className='label'>Email address</label>
                                <Field type="text" name="email" placeholder="Enter your email" className="input" autoComplete="off" />
                                <ErrorMessage name="email" component={TextError} />
                            </div>
                            <div className='form-input'>
                                <label className='label'>Contact Number</label>
                                <Field type="text" name="number" placeholder="Enter your contact number" className="input" autoComplete="off" />
                                <ErrorMessage name="number" component={TextError} />
                            </div>
                            <div className='form-input signup-password'>
                                <label className='label'>Password</label>
                                <Field name="password" placeholder="Enter your password" className="input" autoComplete="off" type={ 'text'} />
                               
                                <ErrorMessage name="password" component={TextError} />
                            </div>
                            <div className='form-input signup-password'>
                                <label className='label'>Confirm Password</label>
                                <Field name="confirmpassword" placeholder="Enter confirm password" className="input" autoComplete="off" type={ 'text'} />
                              
                                <ErrorMessage name="confirmpassword" component={TextError} />
                            </div>
                            <div>
                                <button className='submit-btn' type="submit" >Submit</button>
                            </div>
                            <h4 className='already-have-account'>Already have an account? <Link to={"/"} style={{ color: "white" }}>Log in here</Link></h4>
                        </div>
                    </Form>
                </div>
            </Formik>
        </div>

    )
}

export default Signup
