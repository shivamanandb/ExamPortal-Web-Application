import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { categoryQuizzes, deleteQuiz } from '../../services/operations/quizAPI';
import { Card, CardHeader, Avatar, CardContent, CardActions, Button } from '@mui/material';
import examLogo from '../../assets/exam.png';
import { useNavigate, useParams } from 'react-router-dom';

const ViewQuizzesOfCategory = () => {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    const { token } = useSelector((state) => state.auth);
    const { categoryId } = useParams();

    const getQuizzes = async () => {
        const toastId = toast.loading("Loading...");
        try {
            const res = await categoryQuizzes(categoryId, token);
            setQuizzes(res);
            toast.success("Category Quizzes Fetched");
        } catch (error) {
            ////console.log("Error:", error);
            toast.error("Something went wrong");
        }
        toast.dismiss(toastId);
    };

    const deleteQuizAndUpdateState = async (quizId) => {
        const toastId = toast.loading("Loading...");
        try {
            await deleteQuiz(quizId, token);
            setQuizzes(quizzes.filter(quiz => quiz.qId !== quizId));
            toast.success("Quiz Deleted Successfully");
        } catch (error) {
            ////console.log("Error:", error);
            toast.error("Something went wrong");
        }
        toast.dismiss(toastId);
    };

    useEffect(() => {
        getQuizzes();
    }, [categoryId]);

    return (
        <div className="p-4">
            <h2 className="mb-4 text-2xl font-bold">SELECTED CATEGORY QUIZZES</h2>
            {quizzes.map((q, index) => (
                <Card key={index} className="mb-4">
                    <CardHeader
                        avatar={<Avatar src={examLogo} alt="No Image" />}
                        title={q?.title}
                        subheader={q?.category?.title}
                    />
                    <CardContent className="mt-[-30px]">
                        {q?.description}
                    </CardContent>
                    <CardActions className="flex flex-wrap justify-between">
                        <div className="flex flex-wrap w-full justify-center lg:justify-start gap-2 sm:justify-between">
                            <Button type='submit' onClick={() => navigate(`/admin/viewQuestions/${q.qId}/${q.title}`)} variant="contained" color="success" className="mb-2 sm:mb-0 mr-2">
                                Questions
                            </Button>
                            <Button type='submit' variant="outlined" color="success" className=" normal-case mb-2 sm:mb-0 mr-2">
                                Max Marks: {q.maxMarks}
                            </Button>
                            <Button type='submit' variant="outlined" color="success" className="mb-2 sm:mb-0 mr-2">
                                Questions: {q.numberOfQuestions}
                            </Button>
                            <Button type='submit' onClick={() => navigate(`/admin/updateQuiz/${q.qId}`)} variant="contained" color="success" className="mb-2 sm:mb-0 mr-2">
                                Update
                            </Button>
                            <Button type='submit' variant="contained" color="success" className="mb-2 sm:mb-0 mr-2">
                                Attempts
                            </Button>
                            <Button type='submit' onClick={() => deleteQuizAndUpdateState(q.qId)} variant="contained" color="error" className="mb-2 sm:mb-0">
                                Delete
                            </Button>
                        </div>
                    </CardActions>
                </Card>
            ))}
            <div className='flex items-center justify-center'>
                <Button type='submit' onClick={() => { navigate("/admin/addQuiz") }} variant="contained" color="primary">
                    Add New Quiz
                </Button>
            </div>
        </div>
    );
};

export default ViewQuizzesOfCategory;