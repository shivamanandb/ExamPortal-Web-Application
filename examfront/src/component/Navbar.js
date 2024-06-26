import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../services/operations/authAPI';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Container
} from '@mui/material';
import { MdOutlineMenuBook, MdPerson, MdExitToApp } from "react-icons/md";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const loginHandler = () => {
    navigate("/login");
  };

  const signupHandler = () => {
    navigate("/signup");
  };

  const logoutHandler = () => {
    dispatch(logout(navigate));
    handleClose();
  };

  return (
    <AppBar position="fixed" className="bg-gradient-to-r from-indigo-800 to-purple-900 shadow-md">
      <Container maxWidth="lg">
        <Toolbar className="flex justify-between items-center py-2">
          <Link to="/" className="flex items-center space-x-2 text-white no-underline transition duration-300 hover:opacity-80">
            <IconButton color="inherit" edge="start" aria-label="menu">
              <MdOutlineMenuBook className="text-2xl" />
            </IconButton>
            <Typography variant="h6" component="div" className="font-bold tracking-wide text-white">
              Exam Portal
            </Typography>
          </Link>

          <div className="flex items-center space-x-4">
            {token === null ? (
              <>
                <Button
                  onClick={loginHandler}
                  color="inherit"
                  variant="outlined"
                  className="border-white text-white hover:bg-white hover:text-indigo-100 transition duration-300"
                >
                  Login
                </Button>
                <Button
                  onClick={signupHandler}
                  color="inherit"
                  variant="outlined"
                  className="border-white text-white hover:bg-white hover:text-indigo-100 transition duration-300"
                >
                  Register
                </Button>
              </>
            ) : (
              <div>
                <IconButton
                  onClick={handleMenu}
                  color="inherit"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                >
                  <Avatar className="bg-white text-indigo-800">
                    {user?.firstName?.[0]?.toUpperCase() || <MdPerson />}
                  </Avatar>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} className="hover:bg-indigo-100">
                    <MdPerson className="mr-2 text-indigo-600" />
                    <span className="text-indigo-800">Profile</span>
                  </MenuItem>
                  <MenuItem onClick={logoutHandler} className="hover:bg-indigo-100">
                    <MdExitToApp className="mr-2 text-indigo-600" />
                    <span className="text-indigo-800">Logout</span>
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
