import { Button, Paper, capitalize } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import TableData from '../component/TableData'

export const Profile = () => {

    const {user} = useSelector((state) => state.profile)

    return (
        <div>
            <Paper variant="elevation" className='p-4 lg:text-2xl bg-gradient-to-br from-gray-700 to-red-950 md:text-lg'>
                <div className='text-slate-100'>Your Profile Details</div>

                {
                    user && (
                        <div className='flex flex-col gap-6'>
                            <img 
                                src={`https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`}
                                alt='ProfilePic'
                                className='object-cover p-2 mx-auto border rounded-full border-gray-950' height={200} width={180}
                            />
                            <div className='mx-auto text-3xl font-bold uppercase text-slate-100'>
                                {capitalize(user.firstName)} {capitalize(user.lastName)}
                            </div>
                            
                            <div className='w-full p-3 text-slate-100'>
                                <TableData user={user}/>
                            </div>

                            <div className='flex items-center justify-center gap-3'>
                                <div><Button  variant="contained" color="primary">UPDATE</Button></div>
                                <div><Button  variant="contained" color="secondary">SHARE</Button></div>

                            </div>
                        
                        </div>
                        
                    )
                }
                
            </Paper>
            
        </div>
    )
}
