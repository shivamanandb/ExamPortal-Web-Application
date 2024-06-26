import React, { useEffect, useState } from 'react';
import {
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
  IconButton,
  ListItemButton,
  ListItemAvatar,
  Typography
} from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { getAllCategories } from '../../services/operations/categoryAPI';
import { useSelector } from 'react-redux';
import { IoLogOutSharp } from 'react-icons/io5';
import { MdQuiz } from "react-icons/md";
import { IoMdHome } from 'react-icons/io';

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    const fetchCategories = async (user, token) => {
      try {
        const response = await getAllCategories(user.institute.id, token);
        setCategories(response);
      } catch (error) {
        setError(error); // Store error for Snackbar display
      }
    };

    fetchCategories(user, token);
  }, [user, token]);

  const handleSnackbarClose = () => {
    setError(null); // Clear error state for Snackbar dismissal
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="text-white bg-gray-900">
      {/* Open/Close button for small screens */}
      <div className="fixed top-0 left-0 z-50 w-full lg:hidden bg-slate-500">
        <div className="flex items-center justify-between p-4">
          <Typography variant="h5">Menu</Typography>
          <button className="text-white" onClick={toggleMenu}>
            {showMenu ? "Close" : "Open"}
          </button>
        </div>
      </div>

      {/* Sidebar content */}
      <Card className={`lg:block ${showMenu ? 'block' : 'hidden'} h-full max-w-[20rem] p-4 shadow-xl rounded-lg`}>
        <div className="p-4 mb-6 text-lg font-bold">Menu</div>
        <List className="space-y-2">
          <NavLink to="/user/home">
            <ListItem disablePadding>
              <ListItemButton className='flex items-start justify-start gap-7 hover:bg-gray-800'>
                <div className='flex items-center justify-normal'>
                  <ListItemIcon>
                    <IoMdHome size={25} />
                  </ListItemIcon>
                  <ListItemText>
                    <div>Home</div>
                  </ListItemText>
                </div>
              </ListItemButton>
            </ListItem>
          </NavLink>

          <ListItem component={Link} to={`/user/0`} disablePadding>
            <ListItemButton className='flex items-start justify-start gap-7 hover:bg-gray-800'>
              <div className='flex items-center justify-normal'>
                <ListItemIcon>
                  <MdQuiz size={24} />
                </ListItemIcon>
                <ListItemText primary="All Quiz" />
              </div>
            </ListItemButton>
          </ListItem>
          {categories.map((category) => (
            <ListItem key={category.cid} component={Link} to={`/user/${category.cid}`} disablePadding>
              <ListItemButton className='flex items-start justify-start gap-7 hover:bg-gray-800'>
                <div className='flex items-center justify-normal'>
                  <ListItemIcon>
                    <MdQuiz size={24} />
                  </ListItemIcon>
                  <ListItemText primary={category.title} />
                </div>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Card>

      <Snackbar
        open={error !== null} // Control Snackbar visibility based on error state
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Optional customization
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            {/* <CloseIcon /> */}
          </IconButton>
        }
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Error in loading categories from server
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Sidebar;
