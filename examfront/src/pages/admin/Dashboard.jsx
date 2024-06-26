import React from 'react';
import { Sidebar } from './Sidebar';
import { Outlet, Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';

export const Dashboard = () => {
  return (
    <div className='flex flex-col lg:flex-row gap-5 m-5'>
      <div className='lg:w-2/12 fixed m-8 mt-20 h-full'>
        <div className=' sm:w-full'>
          <Sidebar />
        </div>
      </div>
      <div className='w-full lg:ml-1/5 lg:w-10/12 lg:pl-10'>
        <header className="bg-white shadow-md mb-5">
          <div className="py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Typography variant="h4" className="text-gray-800 font-bold">
              Admin Dashboard
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/admin/enrolled-students"
            >
              Enrolled Students' List
            </Button>
          </div>
        </header>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
