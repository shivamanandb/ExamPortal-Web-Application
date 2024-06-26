import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export const UserDashboard = () => {
  return (
    <div className="flex">
      <div className="fixed w-64 mt-20">
        <Sidebar />
      </div>
      <div className="ml-64 w-full p-5">
        <Outlet />
      </div>
    </div>
  );
};
