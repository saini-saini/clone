import React, { useEffect, useRef } from 'react';
import './accountDetail.css';
import { LogoutUserData } from '../../redux/userData/action';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const AccountDetail = ({ onClose}) => {
  const dispatch = useDispatch();
  const accountDetailRef = useRef(null);

  const clearLoginData = () => {
    dispatch(LogoutUserData());
  };

  const handleClickOutside = (event) => {
    if (accountDetailRef.current && !accountDetailRef.current.contains(event.target)) {
      onClose(); 
    }
  };

  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className='accountDetail-container' ref={accountDetailRef}>
      <Link to={"/layout/profile"} className='accountDetail-heading' onClick={onClose}>Profile</Link>
      <Link to={"/"} className='accountDetail-heading' onClick={clearLoginData}>Log out</Link>
    </div>
  );
};

export default AccountDetail;
