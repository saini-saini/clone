import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import './profile.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextError from './errorMessage';
// import { useNavigate } from 'react-router-dom';
import { ProfileValidation } from '../formValidation/formValidation';

const Profile = () => {

    // const navigate = useNavigate();
    const signUpUserData = useSelector(state => state.userDetail.loggedInUser);
    // const onSubmit = (values) => {
    //     navigate("/layout");
    // };

    return (
        <div className='profile-wrapper'>
            <h1 style={{ color: "white", backgroundColor: "#282828", margin: "0px", position: "absolute", top: "23px", left: "50%" }}>Profile</h1>
            <div className='profile-container'>
                <div className='profile-img'>
                    <Avatar sx={{ bgcolor: "#282828", cursor: "pointer", width: "170px", height: "170px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                        {signUpUserData && signUpUserData.username ? signUpUserData?.username.charAt(0).toUpperCase() : ''}
                    </Avatar>
                </div>
                <Formik
                    initialValues={{
                        email: signUpUserData ? signUpUserData.email : '',
                        number: signUpUserData ? signUpUserData.number : '',
                        username: signUpUserData ? signUpUserData.username : ''
                    }}
                    // onSubmit={onSubmit}
                    validationSchema={ProfileValidation}>
                    <div >
                        <Form>
                            <div className='form-input'>
                                <div className='form-input-wrapper'>
                                    <label htmlFor="">Name</label>
                                    <Field type="text" name="username" placeholder="username" className="input" autoComplete="off" disabled />
                                    <ErrorMessage name="username" component={TextError} />
                                </div>
                                <div className='form-input-wrapper'>
                                    <label htmlFor="">Email</label>
                                    <Field type="text" name="email" placeholder="email address" className="input" autoComplete="off" disabled />
                                    <ErrorMessage name="email" component={TextError} />
                                </div>
                                <div className='form-input-wrapper'>
                                    <label htmlFor="">Number</label>
                                    <Field type="text" name="number" placeholder="contact number" className="input" autoComplete="off" disabled />
                                    <ErrorMessage name="number" component={TextError} />
                                </div>
                                {/* <div>
                                    <button className='update-btn' type="submit" >Save</button>
                                </div> */}
                            </div>
                        </Form>
                    </div>
                </Formik>
            </div>
        </div>
    );
};

export default Profile;