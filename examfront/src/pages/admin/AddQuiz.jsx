import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { addQuiz } from '../../services/operations/quizAPI';
import { Button, Card, FormControl, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
import { getAllCategories } from '../../services/operations/categoryAPI';

export const AddQuiz = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const [categories, setCategories] = useState([]);
    const [publishStatus, setPublishStatus] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await getAllCategories(user.institute.id, token);
                setCategories(res);
            } catch (error) {
                ////console.log("Fetching Categories error:", error);
            }
        };
        getCategories();
    }, [token]);

    const formSubmit = async (data) => {
        data.active = publishStatus;
        data.category = selectedCategory;
        data.institute = user.institute;
        await addQuiz(data, token);
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                title: "",
                description: "",
                maxMarks: "",
                numberOfQuestions: "",
                category: null
            });
            setPublishStatus(false);
            setSelectedCategory("");
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <div className="flex items-center justify-center min-h-screen rounded-lg bg-gradient-to-tr from-indigo-500 to-orange-800">
            <div className="w-full p-8 rounded-lg bg-blue-50 lg:w-2/3 xl:w-1/2">
                <Typography variant="h4" className="mb-6 font-bold text-center text-blue-900">Add New Quiz</Typography>
                <form className="space-y-6" onSubmit={handleSubmit(formSubmit)}>
                    <TextField
                        className='w-full'
                        size='small'
                        label="Title"
                        name='title'
                        variant="filled"
                        color='primary'
                        placeholder='Enter Title here'
                        {...register("title", { required: true })}
                    />
                    {errors.title && <span className="text-sm text-red-500">Please enter the Title.</span>}
                    <TextField
                        className='w-full'
                        size='small'
                        multiline
                        label="Description"
                        name='description'
                        color='primary'
                        variant="filled"
                        placeholder='Enter Description here'
                        {...register("description", { required: true })}
                    />
                    {errors.description && <span className="text-sm text-red-500">Please enter Description.</span>}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <TextField
                            className='w-full'
                            size='small'
                            label="Maximum Marks"
                            name='maxMarks'
                            color='primary'
                            variant="filled"
                            placeholder='Enter Maximum Marks'
                            type="number"
                            inputProps={{ min: 0 }}
                            {...register("maxMarks", { required: true })}
                        />
                        {errors.maxMarks && <span className="text-sm text-red-500">Please enter Maximum Marks.</span>}
                        <TextField
                            className='w-full'
                            size='small'
                            label="Number of Questions"
                            name='numberOfQuestions'
                            color='primary'
                            variant="filled"
                            placeholder='Enter Number of Questions'
                            type="number"
                            inputProps={{ min: 0 }}
                            {...register("numberOfQuestions", { required: true })}
                        />
                        {errors.numberOfQuestions && <span className="text-sm text-red-500">Please enter the Number of Questions.</span>}
                    </div>
                    <div className='flex items-center'>
                        <Switch
                            checked={publishStatus}
                            onChange={() => setPublishStatus(!publishStatus)}
                            inputProps={{ 'aria-label': 'controlled' }}
                            color='primary'
                        /> Publish Status
                    </div>
                    <FormControl className='w-full' variant="filled">
                        <InputLabel color='primary' id="demo-simple-select-filled-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            size='small'
                            color='primary'
                            value={selectedCategory}
                            {...register("category", { required: true })}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category.cid} value={category}>{category.title}</MenuItem>
                            ))}
                        </Select>
                        {errors.category && <span className="text-sm text-red-500">Please Enter valid category.</span>}
                    </FormControl>
                    <div className='flex justify-center gap-4 md:justify-start'>
                        <Button type='submit' variant="contained" color="primary">Add</Button>
                        <Button type='button' variant="contained" color="primary" onClick={() => reset()}>Reset</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
