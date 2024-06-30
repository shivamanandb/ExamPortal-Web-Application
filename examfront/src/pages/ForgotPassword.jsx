import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Paper, Snackbar } from '@mui/material';
import { ArrowLeft } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const BASE_URL = process.env.REACT_APP_BASE_URL

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(BASE_URL + '/api/password/reset-request', null, { params: { email: data.email } });
            ////console.log("Helllo", response)
            setMessage(response.data);
            setOpen(true);
        } catch (error) {
            setMessage('An error occurred. If you changed your password recently then please try again after 1 hour');
            setOpen(true);
        }
    };

    return (
        <div className="bg-gradient-to-br flex items-center justify-center p-4">
            <Paper elevation={4} className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-gray-800">Forgot Password</h2>
                    <p className="text-gray-500">No worries, we'll send you reset instructions.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            type="email"
                            label="Email address"
                            variant="outlined"
                            {...register("email", { 
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Reset Password
                    </Button>
                </form>

                <div className="text-center">
                    <button
                        onClick={() => navigate('/login')}
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition duration-300 ease-in-out"
                    >
                        <ArrowLeft className="mr-2" />
                        Back to Login
                    </button>
                </div>
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