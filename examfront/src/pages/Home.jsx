import React from 'react';
import { Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import front from '../assets/front.jpeg';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../utils/Constants';

export const Home = () => {
  const { token } = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile)
  const navigate = useNavigate()

  const clickHandler = () => {
    
    if(user.authorities[0].authority === ACCOUNT_TYPE.NORMAL)
      navigate("/user/myProfile")
    else if(user?.authorities[0].authority === ACCOUNT_TYPE.ADMIN)
      navigate("/admin/myProfile")
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <img src={front} alt="logo" className="w-full max-h-96 bg-cover object-cover rounded-lg shadow-md" />

      <Typography variant="h4" className="text-center text-3xl font-bold">
        Welcome To ExamPortal
      </Typography>

      {token ? (
        <div>
          <Button variant="contained" onClick={clickHandler}  color="primary">Go to profile</Button>
        </div>
      ) : (
        <div className='flex gap-2'>
          <Button variant="contained" onClick={() => navigate("/login")} color="primary">Login</Button>
          <Button variant="contained" onClick={() => navigate("/signup")} color="secondary">Register</Button>
        </div>
      )}
    </div>
  );
};

