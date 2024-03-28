import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import TextError from './errorMessage'
import './login.css'
import { useNavigate } from "react-router-dom";
import { LoginValidation } from '../formValidation/formValidation'
import spotify from '../../images/spotify.png'
import { useDispatch } from 'react-redux'
import { LoginUserData } from '../../redux/userData/action'
import { useSelector } from 'react-redux'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState } from 'react'
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(state => state.userDetail.error);
  const loggedInUser = useSelector(state => state.userDetail.loggedInUser);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  if (loggedInUser) {
    navigate("/layout");
  }


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className='login-container-wrapper'>
      <div className='logo'>
        <img src={spotify} alt="spotifyLogo" className='spotify-logo' />
        <h2 style={{ color: "white", margin: "0px", cursor: "pointer" }}>Spotify</h2>

      </div>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => {
          dispatch(LoginUserData(values));
          actions.setSubmitting(false);
          setOpenSnackbar(true);
        }}
        validationSchema={LoginValidation}>
        <div className='login-container'>
          <Form>
            <div className='login-form-wrapper'>
              <h1 className='login-heading'>Log in to Spotify</h1>
              <div className='form-input'>
                <label className='label'>Email address</label>
                <Field type="text" name="email" placeholder="Enter your email" className="input" autoComplete="off" />
                <ErrorMessage name="email" component={TextError} />
              </div>
              <div className="form-input password">
                <label className="label">Password</label>
                <Field
                  type={ 'text'}
                  name="password"
                  placeholder="Enter your password"
                  className="input"
                  autoComplete="off"
                />
                <ErrorMessage name="password" component={TextError} />
              </div>
              <div>
                <button className='submit-btn' type="submit" >Submit</button>
              </div>
              <h4 className='already-have-account'>Don't have an account? <Link to={"/signup"} style={{ color: "white" }}>Sign up for Spotify</Link></h4>
            </div>
          </Form>
        </div>
      </Formik>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert variant="filled" onClose={handleCloseSnackbar} severity="error">
          {error}
        </MuiAlert>
      </Snackbar>
    </div>

  )
}

export default Login
