import React, { useEffect } from 'react';
import { Button, Card, FormControl, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { addCategory } from '../../services/operations/categoryAPI';
import { useSelector } from 'react-redux';

export const AddCategory = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();
    const { token } = useSelector((state) => state.auth);

    const formSubmit = (data) => {
        addCategory(data, token);
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                title: "",
                description: ""
            });
        }
    }, [reset, isSubmitSuccessful]);

    return (
        <div className="flex items-center justify-center min-h-screen rounded-lg bg-gradient-to-tr from-indigo-500 to-orange-800">
            <div className="w-full p-8 rounded-lg bg-blue-50 lg:w-2/3 xl:w-1/2">
                <Typography variant="h4" className="mb-6 font-bold text-center text-blue-900">Add New Category</Typography>
                <form className="space-y-6" onSubmit={handleSubmit(formSubmit)}>
                    <TextField
                        className='w-full'
                        size='small'
                        id="outlined-basic"
                        label="Title"
                        name='title'
                        variant="filled"
                        color='primary'
                        placeholder='Enter Title here'
                        {...register("title", { required: true })}
                    />
                    {errors.title && <span className="-mt-3 text-[12px] text-yellow-900">Please enter the Title.</span>}
                    <TextField
                        rows={10}
                        className='w-full'
                        size='small'
                        multiline
                        id="outlined-basic"
                        label="Description"
                        name='description'
                        color='primary'
                        variant="filled"
                        placeholder='Enter Description here'
                        {...register("description", { required: true })}
                    />
                    {errors.description && <span className="-mt-3 text-[12px] text-yellow-900">Please enter the Description.</span>}
                    <div className='flex justify-center gap-4 md:justify-start'>
                        <Button type='submit' variant="contained" color="primary">ADD</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
