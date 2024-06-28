import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Button, Avatar, CardHeader } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { getActiveQuizzes, getActiveQuizzesByCategory } from '../../services/operations/quizAPI';
import { useSelector } from 'react-redux';
import examLogo from '../../assets/examTime.png'
import QuizInstructions from './Instructions'

export const LoadQuiz = () => {

    const [quizzes, setQuizzes] = useState([])
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)

    const { cid } = useParams()

    useEffect(() => {
        const fetchQuizzes = async (cid, token) => {
            if (cid === "0") {
                setQuizzes([])
                try {
                    const quizzesData = await getActiveQuizzes(user.institute.id, token); // Assuming this function fetches quizzes data
                    setQuizzes(quizzesData);
                } catch (error) {
                    console.error('Error fetching quizzes:', error.message);
                }
            }
            else {
                setQuizzes([])
                try {

                    const categoryData = await getActiveQuizzesByCategory(cid, token);
                    setQuizzes(categoryData)

                } catch (error) {
                    console.error('Error fetching quiz:', error.message)
                }
                //console.log("Category Data: ", quizzes)
            }
        };

        fetchQuizzes(cid, token);
    }, [cid, token]);
    return (
        <div className="bootstrap-wrapper">
            <div className="container-fluid">
                <h1 className="text-3xl">Available Quizzes</h1>
                <div className="flex flex-wrap gap-3 mt-8 justify-evenly">
                    {quizzes.length > 0 ? (
                        quizzes.map((quiz) => (
                            <div key={quiz.qId} className="col-md-4">
                                <Card className="mb-2">

                                    <CardHeader
                                        avatar={
                                            <Avatar alt="Avatar" src={examLogo} className="example-header-image" />
                                        }
                                        title={quiz.title}
                                        subheader={quiz.category.title}
                                    />
                                    <CardContent>
                                        <p className="truncate">{quiz.description}</p>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant='contained' color="secondary">
                                                View
                                        </Button>
                                        <Button
                                            variant="contained"
                                            component={Link}
                                            to={`/user/instructions/${quiz.qId}`}
                                            color="error"
                                        >
                                            Start
                                        </Button>
                                        
                                        <Button color="warning">Questions: {quiz.numberOfQuestions}</Button>
                                        <Button color="primary">M.M: {quiz.maxMarks}</Button>
                                    </CardActions>
                                </Card>
                            </div>
                        ))
                    ) : (
                        <div className="col-md-12">
                            <Card>
                                <CardContent>
                                    <h1>No data in this category</h1>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
