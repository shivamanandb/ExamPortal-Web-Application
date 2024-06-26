import React, { useState } from "react";
import { Card, Typography, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { NavLink, useNavigate } from 'react-router-dom';
import { IoMdHome, IoMdAdd } from "react-icons/io";
import { FaUserCircle } from 'react-icons/fa';
import { BiSolidCategory, BiSolidMessageSquareAdd } from 'react-icons/bi';
import { MdQuiz } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/operations/authAPI';

export function Sidebar() {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout(navigate));
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      {/* For small screens */}
      <div className="fixed top-0 left-0 z-50 w-full lg:hidden bg-gradient-to-r from-slate-400 to-slate-900">
        <div className="flex items-center justify-between p-4">
          <Typography variant="h3">Menu</Typography>
          <button className="text-white" onClick={toggleMenu}>
            {showMenu ? "Close" : "Open"}
          </button>
        </div>
      </div>
      <div className={`lg:hidden ${showMenu ? 'block' : 'hidden'}`}>
        <div className="fixed top-0 left-0 z-40 w-full h-full bg-gray-900 bg-opacity-80" onClick={closeMenu}></div>
        <div className="fixed top-0 left-0 z-50 w-full h-full overflow-y-auto">
          <Card className="w-full p-4 text-white bg-gray-900 rounded-lg shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <Typography variant="h3">Menu</Typography>
              <button className="text-white" onClick={closeMenu}>Close</button>
            </div>
            <List className="space-y-2">
              <NavLink to="/admin/home">
                <ListItem className="flex items-center p-0 transition-colors hover:bg-gray-800">
                  <ListItemPrefix>
                    <IoMdHome className="w-6 h-6 mr-2" />
                  </ListItemPrefix>
                  <Typography className="text-lg">Home</Typography>
                </ListItem>
              </NavLink>
              <NavLink to="/admin/myProfile">
                <ListItem className="flex items-center p-0 transition-colors hover:bg-gray-800">
                  <ListItemPrefix>
                    <FaUserCircle className="w-6 h-6 mr-2" />
                  </ListItemPrefix>
                  <Typography className="text-lg">Profile</Typography>
                </ListItem>
              </NavLink>
              <NavLink to="/admin/categories">
                <ListItem className="flex items-center p-0 transition-colors hover:bg-gray-800">
                  <ListItemPrefix>
                    <BiSolidCategory className="w-6 h-6 mr-2" />
                  </ListItemPrefix>
                  <Typography className="text-lg">Categories</Typography>
                </ListItem>
              </NavLink>
              <NavLink to="/admin/quizzes">
                <ListItem className="flex items-center p-0 transition-colors hover:bg-gray-800">
                  <ListItemPrefix>
                    <MdQuiz className="w-6 h-6 mr-2" />
                  </ListItemPrefix>
                  <Typography className="text-lg">Quizzes</Typography>
                </ListItem>
              </NavLink>
              <NavLink to="/admin/addCategory">
                <ListItem className="flex items-center p-0 transition-colors hover:bg-gray-800">
                  <ListItemPrefix>
                    <BiSolidMessageSquareAdd className="w-6 h-6 mr-2" />
                  </ListItemPrefix>
                  <Typography className="text-lg">Add Categories</Typography>
                </ListItem>
              </NavLink>
              <NavLink to="/admin/addQuiz">
                <ListItem className="flex items-center p-0 transition-colors hover:bg-gray-800">
                  <ListItemPrefix>
                    <IoMdAdd className="w-6 h-6 mr-2" />
                  </ListItemPrefix>
                  <Typography className="text-lg">Add Quiz</Typography>
                </ListItem>
              </NavLink>
              <ListItem className="flex items-center p-0 transition-colors cursor-pointer hover:bg-gray-800" onClick={logoutHandler}>
                <Typography className="text-lg">Log Out</Typography>
              </ListItem>
            </List>
          </Card>
        </div>
      </div>
      {/* For larger screens */}
      <div className="hidden lg:block">
        <Card className="sticky top-0 h-full w-full max-w-[20rem] p-4 shadow-xl rounded-lg bg-gray-900 text-white">
          <div className="p-4 mb-6">
            <Typography variant="h3">Menu</Typography>
          </div>
          <List className="space-y-2">
            <NavLink to="/admin/home">
              <ListItem className="flex items-center p-0 transition-colors hover:bg-gray-800">
                <ListItemPrefix>
                  <IoMdHome className="w-6 h-6 mr-2" />
                </ListItemPrefix>
                <Typography className="text-lg">Home</Typography>
              </ListItem>
            </NavLink>
            <NavLink to="/admin/myProfile">
              <ListItem className="flex items-center p-0 transition-colors hover:bg-gray-800">
                <ListItemPrefix>
                  <FaUserCircle className="w-6 h-6 mr-2" />
                </ListItemPrefix>
                <Typography className="text-lg">Profile</Typography>
              </ListItem>
            </NavLink>
            <NavLink to="/admin/categories">
              <ListItem className="flex items-center p-0 transition-colors hover:bg-gray-800">
                <ListItemPrefix>
                  <BiSolidCategory className="w-6 h-6 mr-2" />
                </ListItemPrefix>
                <Typography className="text-lg">Categories</Typography>
              </ListItem>
            </NavLink>
            <NavLink to="/admin/quizzes">
              <ListItem className="flex items-center p-0 transition-colors hover:bg-gray-800">
                <ListItemPrefix>
                  <MdQuiz className="w-6 h-6 mr-2" />
                </ListItemPrefix>
                <Typography className="text-lg">Quizzes</Typography>
              </ListItem>
            </NavLink>
            <NavLink to="/admin/addCategory">
              <ListItem className="flex items-center p-0 transition-colors hover:bg-gray-800">
                <ListItemPrefix>
                  <BiSolidMessageSquareAdd className="w-6 h-6 mr-2" />
                </ListItemPrefix>
                <Typography className="text-lg">Add Categories</Typography>
              </ListItem>
            </NavLink>
            <NavLink to="/admin/addQuiz">
              <ListItem className="flex items-center p-0 transition-colors hover:bg-gray-800">
                <ListItemPrefix>
                  <IoMdAdd className="w-6 h-6 mr-2" />
                </ListItemPrefix>
                <Typography className="text-lg">Add Quiz</Typography>
              </ListItem>
            </NavLink>
            <ListItem className="flex items-center p-0 transition-colors cursor-pointer hover:bg-gray-800" onClick={logoutHandler}>
              <Typography className="text-lg">Log Out</Typography>
            </ListItem>
          </List>
        </Card>
      </div>
    </>
  );
}
