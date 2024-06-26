import React, { useEffect, useState } from 'react';
import logo from "../assets/logo.png";
import { Button, TextField, Link } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';

export const Login = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                username: "",
                password: "",
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                institute: ""
            });
        }
    }, [reset, isSubmitSuccessful]);

    const formSubmit = (data) => {
        dispatch(login(data.username, data.password, navigate));
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    return (
        <div className="flex justify-center items-center mt-20">
            <Paper elevation={4} className="w-full max-w-md p-5 border">
                <div className="flex flex-col items-center">
                    <img src={logo} alt='logo' className="h-24 w-24" />
                    <h1 className='text-2xl mt-4'>Login Here !!</h1>
                </div>
                <form onSubmit={handleSubmit(formSubmit)} className="mt-6">
                    <TextField
                        type='text'
                        id="username"
                        name='username'
                        label="Username*"
                        variant="outlined"
                        className="w-full mb-4"
                        placeholder='Enter Username'
                        {...register("username", { required: true })}
                    />
                    <div className='mt-4'></div>
                    {errors.username && <span className="text-sm text-red-500">Please enter your username.</span>}
                    <TextField
                        type='password'
                        id="password"
                        name='password'
                        label="Password*"
                        variant="outlined"
                        className="w-full mb-4"
                        placeholder='Enter Password'
                        {...register("password", { required: true })}
                    />
                    {errors.password && <span className="text-sm text-red-500">Please enter your password.</span>}
                    <div className='mt-4'></div>
                    <div className="flex justify-between items-center mb-4">
                        <Link
                            component="button"
                            variant="body2"
                            onClick={handleForgotPassword}
                            className="text-blue-500 hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <Button type='submit' variant="contained" color="primary">Login</Button>
                        <Button type='reset' variant="outlined" color="secondary">Reset</Button>
                    </div>
                </form>
            </Paper>
        </div>
    );
};