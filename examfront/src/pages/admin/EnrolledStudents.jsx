import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { fetchStudents } from '../../services/operations/InstituteAPI';
import { deleteUser } from '../../services/operations/profileAPI';

const EnrolledStudents = () => {
   
    const [students, setStudents] = useState([]);
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    const fetchStudent = async () => {
        try {
            const response = await fetchStudents(user.institute.id, token);
            setStudents(response);
            toast.success('Students fetched successfully');
        } catch (error) {
            toast.error('Failed to fetch students');
        }
    };

    const handleDelete = async (studentId) => {
        try {
            await deleteUser(studentId, token);
            setStudents(students.filter(student => student.id !== studentId));
            toast.success('Student deleted successfully');
        } catch (error) {
            toast.error('Failed to delete student');
        }
    };

    return (
        students && <div>
            <Button variant="contained" color="primary" onClick={fetchStudent}>
                Fetch Students
            </Button>
            <Paper style={{ marginTop: '20px', padding: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            student.id !== user.id && <TableRow key={student.id}>
                                <TableCell>{student.id}</TableCell>
                                <TableCell>{student.username}</TableCell>
                                <TableCell>{student.firstName}</TableCell>
                                <TableCell>{student.lastName}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>{student.phone}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="secondary" 
                                        onClick={() => handleDelete(student.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

export default EnrolledStudents;