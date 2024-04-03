import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import './profile.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextError from './errorMessage';
import { ProfileValidation } from '../formValidation/formValidation';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserData } from '../../redux/userData/action';

const Profile = () => {
    const signUpUserData = useSelector(state => state.userDetail.loggedInUser);
    const [disabled, setDisabled] = useState(true);
    const notify = () => toast("✅ Profile updated successfully");
    const dispatch = useDispatch();
    const editClick = () => {
        setDisabled(!disabled);
    }

    const onSave = (values) => {
        const updatedUser = {
            ...signUpUserData,
            username: values.username,
            number: values.number,
        };
        dispatch(updateUserData(updatedUser));
        console.log("Notification should be triggered now");
        notify();
    };

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
                <h1 style={{ color: "white", backgroundColor: "#282828", margin: "0px", textDecoration: "underline" }}>Profile</h1>
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
                    onSubmit={onSave}
                    validationSchema={ProfileValidation}
                    enableReinitialize >
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
                                    <Field type="text" name="email" placeholder="email address" className="input" autoComplete="off" disabled />
                                    <ErrorMessage name="email" component={TextError} />
                                </div>
                                <div className='form-input-wrapper'>
                                    <label htmlFor="">Number</label>
                                    <Field type="text" name="number" placeholder="contact number" className="input" autoComplete="off" disabled={disabled} style={{ backgroundColor: disabled ? '#3E3E3E' : '#777777' }} />
                                    <ErrorMessage name="number" component={TextError} />
                                </div>
                                <div>
                                    <button className='update-btn' type="submit" disabled={disabled} style={{ display: disabled ? 'none' : 'block' }}>Save</button>
                                    <ToastContainer
                                        autoClose={3000}
                                        hideProgressBar
                                        closeOnClick
                                        theme='dark'
                                    />
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