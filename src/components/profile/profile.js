import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import './profile.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextError from './errorMessage';
// import { useNavigate } from 'react-router-dom';
import { ProfileValidation } from '../formValidation/formValidation';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
    const signUpUserData = useSelector(state => state.userDetail.loggedInUser);
    const [disabled, setDisabled] = useState(true);

    const editClick = () => {
        setDisabled(!disabled);

    }
    
    return (
        <div className='profile-wrapper'>
            <div style={{
                display: "flex",
                position: "absolute",
                top: "11px",
                left: "50%",
                justifyContent: "center",
                alignItems: "center",
                gap: "15px"
            }}>
                <h1 style={{ color: "white", backgroundColor: "#282828", margin: "0px" }}>Profile</h1>
                <EditIcon sx={{ color: "white", cursor: "pointer" }} onClick={() => editClick()} />
            </div>
            <div className='profile-container'>
                <div className='profile-img'>
                    <Avatar sx={{ bgcolor: "#282828", cursor: "pointer", width: "170px", height: "170px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", borderRadius: "5%" }}>
                        <h1>{signUpUserData && signUpUserData.username ? signUpUserData?.username.charAt(0).toUpperCase() : ''}</h1>
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
                                    <Field type="text" name="username" placeholder="username" className="input" autoComplete="off" disabled={disabled} style={{ backgroundColor: disabled ? '#3E3E3E' : '#777777' }} />
                                    <ErrorMessage name="username" component={TextError} />
                                </div>
                                <div className='form-input-wrapper'>
                                    <label htmlFor="">Email</label>
                                    <Field type="text" name="email" placeholder="email address" className="input" autoComplete="off" disabled={disabled} style={{ backgroundColor: disabled ? '#3E3E3E' : '#777777' }} />
                                    <ErrorMessage name="email" component={TextError} />
                                </div>
                                <div className='form-input-wrapper'>
                                    <label htmlFor="">Number</label>
                                    <Field type="text" name="number" placeholder="contact number" className="input" autoComplete="off" disabled={disabled} style={{ backgroundColor: disabled ? '#3E3E3E' : '#777777' }} />
                                    <ErrorMessage name="number" component={TextError} />
                                </div>
                                <div>
                                    <button className='update-btn' type="submit" disabled={disabled} style={{ display: disabled ? 'none' : 'block' }} onClick={() => console.log("save clicked")}>Save</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </Formik>
            </div>
        </div>
    );
};

export default Profile;