import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { evalQuizQuestions, getQuestionsOfQuizForTest } from '../../services/operations/questionAPI';
import Swal from 'sweetalert2';
import { Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Divider, Typography } from '@mui/material';
import PlayArrowSharpIcon from '@mui/icons-material/PlayArrowSharp';

export const StartQuiz = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [questions, setQuestions] = useState([]);
  const [marksGot, setMarksGot] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Prevent back navigation
    const preventBackNavigation = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', preventBackNavigation);

    // Disable back and forward buttons
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, null, window.location.href);
    };

    // Enter full-screen mode
    const enterFullScreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    };

    enterFullScreen();

    // Prevent minimize and other actions
    const preventActions = (e) => {
      if (
        (e.ctrlKey && (e.keyCode === 78 || e.keyCode === 87 || e.keyCode === 82 || e.keyCode === 116)) ||
        (e.altKey && e.keyCode === 115) ||
        (e.keyCode === 116) ||
        (e.keyCode === 123)
      ) {
        e.preventDefault();
      }
    };

    // Prevent right-click
    const preventContextMenu = (e) => {
      e.preventDefault();
    };

    // Prevent mouse from leaving the window
    const preventMouseLeave = (e) => {
      if (e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
        enterFullScreen();
      }
    };

    // Add event listeners
    document.addEventListener('keydown', preventActions);
    document.addEventListener('contextmenu', preventContextMenu);
    document.addEventListener('mouseleave', preventMouseLeave);

    // Check full-screen status periodically
    const fullScreenInterval = setInterval(() => {
      if (!document.fullscreenElement && 
          !document.webkitFullscreenElement && 
          !document.mozFullScreenElement &&
          !document.msFullscreenElement) {
        enterFullScreen();
      }
    }, 1000);

    return () => {
      window.removeEventListener('beforeunload', preventBackNavigation);
      window.onpopstate = null;
      document.removeEventListener('keydown', preventActions);
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('mouseleave', preventMouseLeave);
      clearInterval(fullScreenInterval);

      // Exit full-screen mode when component unmounts
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    };
  }, []);

  const handleInputChange = (event, index) => {
    const { value } = event.target;
    const newQuestions = [...questions];
    newQuestions[index].givenAnswer = value;
    setQuestions(newQuestions);
    //console.log(questions)
  };

  const printPage = () => {
    window.print()
  }

  const getFormattedTime = () => {
    let mm = Math.floor(timer / 60);
    let ss = timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  };

  const loadQuestions = () => {
    getQuestionsOfQuizForTest(quizId, token)
      .then((res) => {
        setQuestions(res);
        setTimer(res.length * 2 * 60);
        startTimer();
      })
      .catch((error) => {
        //console.log(error);
        // Handle error
      });
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const submitQuiz = () => {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        evalQuiz(questions, token);
      }
    });
  };

  const startTimer = () => {
    const t = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(t);
          evalQuiz(questions, token);
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);
  };

  const evalQuiz = async (questions, token) => {
    try {
      const res = await evalQuizQuestions(questions, token);
      const marksGot = parseFloat(res.marksGot).toFixed(2);
  
      setMarksGot(marksGot);
      setCorrectAnswers(res.correctAnswers);
      setAttempted(res.attempted);
      setIsSubmit(true);
    } catch (error) {
      //console.log(error);
      // Handle error
    }
  };

  return (
    <>
      {!isSubmit ? (
        <div className="p-2 mx-auto">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="md:w-2/12">
              <Card>
                <CardContent>
                  <h3 className="text-lg font-bold">Instructions</h3>
                  <ul>
                    <li><i><PlayArrowSharpIcon/>Do not refresh the Page otherwise you will get new questions in this quiz.</i></li>
                    <div className='mt-2'></div>
                    <li><i><PlayArrowSharpIcon/>Do not switch the tabs.</i></li>
                    <div className='mt-2'></div>
                    <li><i><PlayArrowSharpIcon/>Do not minimize the window.</i></li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="md:w-8/12">
              {questions.length > 0 && (
                <>
                  <h1 className="mt-5 mb-4">On Going Quiz <b>{questions[0].quiz.title}</b></h1>
                  {questions.map((q, i) => (
                    <Card key={i} className="mt-4">
                      <CardContent>
                        <Typography variant="h6">
                          <b>Q {i + 1})</b> <span className="ml-2" dangerouslySetInnerHTML={{ __html: q.content }}></span>
                        </Typography>
                        <Divider className="my-4" />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <input
                              type="radio"
                              value={q.option1}
                              checked={q.givenAnswer === q.option1}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                            {q.option1}
                          </div>
                          <div>
                            <input
                              type="radio"
                              value={q.option2}
                              checked={q.givenAnswer === q.option2}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                            {q.option2}
                          </div>
                          <div>
                            <input
                              type="radio"
                              value={q.option3}
                              checked={q.givenAnswer === q.option3}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                            {q.option3}
                          </div>
                          <div>
                            <input
                              type="radio"
                              value={q.option4}
                              checked={q.givenAnswer === q.option4}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                            {q.option4}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <div className="container mt-4 mb-8 text-center">
                    <Button variant="contained" color="primary" onClick={submitQuiz}>
                      Submit Quiz
                    </Button>
                  </div>
                </>
              )}
            </div>
            <div className="lg:w-2/12 ">
              <Card>
                <CardHeader title="Progress" subheader="Quiz will automatically be submitted when the timer reaches 0:0" />
                <CardContent>
                  <Typography variant="h4" className="text-center">{getFormattedTime()}</Typography>
                  <div className='flex items-center justify-center'>
                    <CircularProgress variant="determinate" size={100} color="primary" thickness={5} style={{ margin: 'auto' }} value={(timer / (questions.length * 2 * 60)) * 100} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto mt-8">
          <div className="flex justify-center">
            <div className="w-full md:w-2/3">
              <Card>
                <CardHeader title="Quiz Result" />
                <CardContent className="text-center">
                  <Typography variant="h4">Marks Got: {marksGot}</Typography>
                  <Typography variant="h4">Correct Answers: {correctAnswers}</Typography>
                  <Typography variant="h4">Questions Attempted: {attempted}</Typography>
                </CardContent>
                <CardActions className="flex items-center justify-center">
                  <Button variant="contained" onClick={printPage} color="primary">Print</Button>
                  <Button variant="contained" color="secondary" onClick={() => navigate('/user/0')}>Home</Button>
                </CardActions>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};