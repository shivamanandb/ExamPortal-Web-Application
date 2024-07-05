import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getQuizResultsDetailed } from '../../services/operations/quizAPI';
import { useSelector } from 'react-redux';

const QuizResultDetails = () => {
  const [results, setResults] = useState([]);
  const { quizId } = useParams();
  const {token} = useSelector((state) => state.auth)

  useEffect(() => {
    loadQuizResultsDetailed();
  }, [quizId]);

  const loadQuizResultsDetailed = async () => {
    try {
      const detailedResults = await getQuizResultsDetailed(quizId, token);
      // console.log(detailedResults)
      setResults(detailedResults);
    } catch (error) {
      console.error('Error loading detailed quiz results:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Student Name</TableCell>
            <TableCell>Marks</TableCell>
            <TableCell>Total Marks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {results.map((result) => (
            <TableRow key={result.id}>
              <TableCell>{result.rank}</TableCell>
              <TableCell>{result.student.username}</TableCell>
              <TableCell>{result.marks}</TableCell>
              <TableCell>{result.totalMarks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuizResultDetails;