import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Paper, Snackbar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export const ResetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const BASE_URL = process.env.REACT_APP_BASE_URL

    const token = new URLSearchParams(location.search).get('token');

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            setMessage("Passwords don't match");
            setOpen(true);
            return;
        }

        try {
            const response = await axios.post(BASE_URL + '/api/password/reset', null, { 
                params: { 
                    token: token,
                    password: data.password
                } 
            });
            setMessage(response.data);
            setOpen(true);
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            setMessage(error.response?.data || 'An error occurred. Please try again after 2 minutes.');
            setOpen(true);
        }
    };

    return (
        <div className=" bg-gradient-to-br flex items-center justify-center p-4">
            <Paper elevation={4} className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-gray-800">Reset Password</h2>
                    <p className="text-gray-500">Enter your new password below.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <TextField
                        fullWidth
                        type="password"
                        label="New Password"
                        {...register("password", { required: "Password is required" })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label="Confirm New Password"
                        {...register("confirmPassword", { required: "Please confirm your password" })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Reset Password
                    </Button>
                </form>
            </Paper>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message={message}
            />
        </div>
    );
};