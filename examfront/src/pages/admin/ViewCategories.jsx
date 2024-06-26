import { Button, Card, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdCategory, MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useSelector } from 'react-redux';
import { getAllCategories, deleteCategory } from '../../services/operations/categoryAPI';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const ViewCategories = () => {
    const [categories, setCategories] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);

    const getCategories = async (token) => {
        const toastId = toast.loading("loading...");
        try {
            const res = await getAllCategories(user.institute?.id, token);
            setCategories(res);
            toast.success("All Categories Fetched");
        } catch (error) {
            console.log("fetching Categories error");
            toast.error("Something went wrong");
        }
        toast.dismiss(toastId);
    };

    const handleCategoryClick = (categoryId) => {
        navigate(`/admin/categoryQuizzes/${categoryId}`);
    };

    const handleDeleteCategory = async (categoryId) => {
        const toastId = toast.loading("Deleting category...");
        try {
            await deleteCategory(user.institute?.id, categoryId, token);
            setCategories(categories.filter(c => c.cid !== categoryId));
            toast.success("Category deleted successfully");
        } catch (error) {
            console.log("Delete category error", error);
            toast.error("Failed to delete category");
        }
        toast.dismiss(toastId);
    };

    useEffect(() => {
        getCategories(token);
    }, [token]);

    return (
        <div>
            <Card>
                <List className='flex flex-col gap-4 bg-slate-900'>
                    <Typography variant="subtitle1" className='p-4 bg-slate-700' component="div" style={{ fontWeight: 'bold' }}>
                        <div className='text-2xl text-slate-100'> All Categories</div>
                    </Typography>
                    {categories.map((c, index) => (
                        <ListItem key={index} className='border-t-2 border-b-2 rounded-lg bg-slate-700'>
                            <ListItemIcon>
                                <MdCategory size={24} className='text-slate-100' />
                            </ListItemIcon>
                            <ListItemText 
                                className='text-slate-100 cursor-pointer' 
                                primary={c.title} 
                                secondary={c.description} 
                                onClick={() => handleCategoryClick(c.cid)}
                            />
                            <IconButton onClick={() => handleDeleteCategory(c.cid)} color="error">
                                <MdDelete size={24} />
                            </IconButton>
                        </ListItem>
                    ))}
                    <div className='mx-auto'>
                        <Button 
                            variant="contained" 
                            onClick={() => navigate("/admin/addCategory")} 
                            color="warning"
                        >
                            <IoMdAdd size={20}/> Add New Category
                        </Button>
                    </div>
                </List>
            </Card>
        </div>
    );
};
