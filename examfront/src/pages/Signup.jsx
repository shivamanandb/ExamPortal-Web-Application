import React, { useEffect } from 'react';
import { Button, Paper, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { apiConnector } from '../services/apiConnector';
import { endpoints } from '../services/api';
import toast from 'react-hot-toast';
import logo from "../assets/logo.png";
import { fetchInstitute } from '../services/operations/InstituteAPI';

export const Signup = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                username: "",
                password: "",
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                institute: "",
            });
        }
    }, [reset, isSubmitSuccessful]);

    const formSubmit = async (data) => {
        const toastId = toast.loading("loading...");
        try {
            // Parse instituteId to Long
            data.institute = parseInt(data.institute, 10);
            if (isNaN(data.institute)) {
                toast.error("Invalid Institute ID");
                toast.dismiss(toastId);
                return;
            }

            // //console.log("data:", typeof(data.instituteId))
            const instituteData = await fetchInstitute(data.institute);

            data.institute = instituteData

            const res = await apiConnector("POST", endpoints.SIGNUP_API, data);
            //console.log("Response:", res);
            toast.success("Registered Successfully");
            toast.dismiss(toastId);

        } catch (error) {
            toast.error("Something went wrong");
            toast.dismiss(toastId);
        }
    };

    return (
        <div>
            <Paper variant="elevation" elevation={24} className='flex flex-col items-center w-4/12 gap-5 p-5 mx-auto mt-5'>
                <div className='flex flex-col items-center'>
                    <img src={logo} height={120} width={120} alt='logo' />
                    <h1 className='text-2xl'>Register Here !!</h1>
                </div>
                <div className="w-full">
                    <form className='flex flex-col gap-3' onSubmit={handleSubmit(formSubmit)}>
                        {/* Username */}
                        <TextField
                            type='text'
                            id="outlined-basic"
                            name='username'
                            label="Username*"
                            color='secondary'
                            variant="outlined"
                            className="w-full rounded-md"
                            placeholder='Enter Username'
                            size="small"
                            margin="dense"
                            {...register("username", { required: true })}
                        />
                        {errors.username && (
                            <span className="-mt-3 text-[12px] text-yellow-900">
                                Please enter your username.
                            </span>
                        )}

                        {/* Password */}
                        <TextField
                            type='password'
                            id="outlined-basic"
                            name='password'
                            label="Password*"
                            color='secondary'
                            variant="outlined"
                            className="w-full rounded-md"
                            placeholder='Enter Password'
                            size="small"
                            margin="dense"
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <span className="-mt-3 text-[12px] text-yellow-900">
                                Please enter your password.
                            </span>
                        )}

                        {/* First name */}
                        <TextField
                            type='text'
                            id="outlined-basic"
                            label="First Name*"
                            name='firstName'
                            color='secondary'
                            variant="outlined"
                            className="w-full rounded-md"
                            placeholder='Enter First Name'
                            size="small"
                            margin="dense"
                            {...register("firstName", { required: true })}
                        />
                        {errors.firstName && (
                            <span className="-mt-3 text-[12px] text-yellow-900">
                                Please enter your First Name.
                            </span>
                        )}

                        {/* Last name */}
                        <TextField
                            type='text'
                            id="outlined-basic"
                            label="Last Name*"
                            name='lastName'
                            color='secondary'
                            variant="outlined"
                            className="w-full rounded-md"
                            placeholder='Enter Last Name'
                            size="small"
                            margin="dense"
                            {...register("lastName", { required: true })}
                        />
                        {errors.lastName && (
                            <span className="-mt-3 text-[12px] text-yellow-900">
                                Please enter your Last Name.
                            </span>
                        )}

                        {/* Email */}
                        <TextField
                            type='email'
                            id="outlined-basic"
                            label="Email ID*"
                            name='email'
                            color='secondary'
                            variant="outlined"
                            className="w-full rounded-md"
                            placeholder='Enter Email ID'
                            size="small"
                            margin="dense"
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <span className="-mt-3 text-[12px] text-yellow-900">
                                Please enter your email ID.
                            </span>
                        )}

                        {/* Phone number */}
                        <TextField
                            type='text'
                            name='phone'
                            id="outlined-basic"
                            label="Phone Number*"
                            color='secondary'
                            variant="outlined"
                            className="w-full rounded-md"
                            placeholder='Enter Phone Number'
                            size="small"
                            margin="dense"
                            {...register("phone", { required: true })}
                        />
                        {errors.phone && (
                            <span className="-mt-3 text-[12px] text-yellow-900">
                                Please enter your Phone number.
                            </span>
                        )}

                        {/* Institute ID */}
                        <TextField
                            type='text'
                            id="outlined-basic"
                            label="Institute ID*"
                            name='institute'
                            color='secondary'
                            variant="outlined"
                            className="w-full rounded-md"
                            placeholder='Enter Institute ID'
                            size="small"
                            margin="dense"
                            {...register("institute", { required: true })}
                        />
                        {errors.institute && (
                            <span className="-mt-3 text-[12px] text-yellow-900">
                                Please enter your Institute ID.
                            </span>
                        )}

                        <div className='flex items-center justify-center gap-10 mt-5'>
                            <Button type='submit' variant="contained" color="success">
                                Register
                            </Button>

                            <Button type='reset' variant="contained" color="error">
                                Clear
                            </Button>
                        </div>
                    </form>
                </div>
            </Paper>
        </div>
    );
};
