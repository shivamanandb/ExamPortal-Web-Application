import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { getQuizResultsByInstitute } from '../../services/operations/quizAPI';

const ResultsPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const { user } = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);

  const instituteId = user.institute.id

  useEffect(() => {
    loadQuizResults();
  }, []);

  const loadQuizResults = async () => {
    try {
      const results = await getQuizResultsByInstitute(instituteId, token);
      const groupedResults = groupResultsByQuiz(results);
      setQuizzes(groupedResults);
    } catch (error) {
      console.error('Error loading quiz results:', error);
    }
  };

  const groupResultsByQuiz = (results) => {
    //console.log(results)
    const grouped = {};
    results.forEach(result => {
      if (!grouped[result.quiz.qId]) {
        grouped[result.quiz.qId] = {
          quizId: result.quiz.qId,
          title: result.quiz.title,
          attemptCount: 0
        };
      }
      grouped[result.quiz.qId].attemptCount++;
    });
    return Object.values(grouped);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Quiz Title</TableCell>
            <TableCell>Attempts</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quizzes.map((quiz) => (
            <TableRow key={quiz.quizId}>
              <TableCell>{quiz.title}</TableCell>
              <TableCell>{quiz.attemptCount}</TableCell>
              <TableCell>
                <Button component={Link} to={`/admin/results/${quiz.quizId}`} variant="contained" color="primary">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultsPage;