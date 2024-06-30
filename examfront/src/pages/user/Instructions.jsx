import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardHeader, CardContent, Divider, List, ListItem, ListItemText, Button, CardActions, Avatar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuiz } from '../../services/operations/quizAPI';
import { useSelector } from 'react-redux';
import PlayArrowSharpIcon from '@mui/icons-material/PlayArrowSharp';
import Swal from 'sweetalert2';

function QuizInstructions() {

    const [quiz, setQuiz] = useState([])
    const {token} = useSelector((state) => state.auth)
    const {quizId} = useParams()
    const navigate = useNavigate()

    function startQuiz() {
        // Show confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: "Once you start the quiz, you cannot go back!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, start the quiz!'
        }).then((result) => {
            if (result.isConfirmed) {
                // If user confirms, navigate to the quiz start page
                navigate(`/start/${quizId}`)
                ////console.log('Starting quiz...');
            }
        })
    }

    async function getQuizByQuizId(quizId, token) {
        
        try {
            const res = await getQuiz(quizId, token)
            setQuiz(res)
            
        } catch(error) {
            
            ////console.log("Error in fetching quiz: ", error.message)
        }
    }
    
    useEffect(()=> {
        getQuizByQuizId(quizId, token)
    }, [quizId, token])

  return (
    <Box className="container mx-auto"> {/* Use Box instead of div for layout */}
      <Box className="flex justify-center">
        <Box className="w-full ">
          <Card>
            <div className="font-serif">
                <CardHeader
                title="Read the instructions of this page carefully"
                subheader="One step more to go"
                />
            </div>
            <CardContent className="lg:ml-20">
              <div className='flex flex-col items-center  lg:-ml-20'>
                <Typography variant="h4" className="text-rose-800">{quiz.title}</Typography>
                <Typography variant="body1" className="text-emerald-900">{quiz.description}</Typography>
              </div>
              <div className='mt-3'></div>
              <Divider className="lg:my-4" />
              <div  className='mb-8'></div>
              <div className='text-3xl'>
                <Typography variant="lg:h4">Important Instructions</Typography>
              </div>
              <List> {/* Use List for semantic representation */}
                <ListItem>
                <PlayArrowSharpIcon/>
                  <ListItemText primary="This quiz is only for practice purpose." />
                </ListItem>
                <ListItem>
                <PlayArrowSharpIcon/>
                  <ListItemText
                    primary={`You have to submit quiz within ${quiz.numberOfQuestions * 2} Minutes.`}
                  />
                </ListItem>
                <ListItem>
                <PlayArrowSharpIcon/>
                  <ListItemText primary="You can attempt the quiz any number of times." />
                </ListItem>
                <ListItem>
                <PlayArrowSharpIcon/>
                  <ListItemText primary={`There are ${quiz.numberOfQuestions} questions in this quiz.`} />
                </ListItem>
                <ListItem>
                <PlayArrowSharpIcon/>
                  <ListItemText
                    primary={`Each question carries ${quiz.maxMarks / quiz.numberOfQuestions} marks. No negative marking for wrong ones.`}
                  />
                </ListItem>
                <ListItem>
                <PlayArrowSharpIcon/>
                  <ListItemText primary="All questions are of MCQ types." />
                </ListItem>
              </List>
              <Divider className="lg:my-4" />
              <div  className='mb-8'></div>
              <Typography variant="h4">Attempting Quiz</Typography>
              <List>
                <ListItem>
                <PlayArrowSharpIcon/>
                  <ListItemText primary=" Click Start Quiz button to start the quiz" />
                </ListItem>
                <ListItem>
                <PlayArrowSharpIcon/>
                  <ListItemText primary="The time will start the moment you click the Start Test button." />
                </ListItem>
                <ListItem>
                <PlayArrowSharpIcon/>
                  <ListItemText primary="You cannot resume this quiz if interrupted due to any reason." />
                </ListItem>
                <ListItem>
                <PlayArrowSharpIcon/>
                  <ListItemText primary="Scroll down to move to the next question." />
                </ListItem>
                <ListItem>
                <PlayArrowSharpIcon/>
                  <ListItemText primary="Click on Submit Quiz button on completion of the quiz." />
                </ListItem>
                <ListItem>
                <PlayArrowSharpIcon/>
                  <ListItemText primary="Report of the test is automatically generated in the form of a PDF copy." />
                </ListItem>
              </List>
            </CardContent>
            <CardActions className="justify-center">
              <Button variant="contained" color="primary" onClick={startQuiz}>
                Start Quiz
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default QuizInstructions;
