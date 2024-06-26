import { Button, Card, CardContent, CardHeader, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addQuestion } from '../../services/operations/questionAPI';

export const AddQuestion = () => {

    const {qId, title} = useParams()
    const {token} = useSelector((state) => state.auth)
    
    const [question, setQuestion] = useState({
        quiz: {
          qId: qId  
        },
        content: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuestion({ ...question, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(question);
        addQuestion(question, token)

        setQuestion({
            quiz: {
                qId: qId  
            },
            content: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            answer: '',
        });
        
    };

    return (
        <div>

            <Grid >
                <Grid item xs={12}>
                    <Card variant="outlined">
                        <CardHeader
                            title={`Add Question to ${title}`}
                            titleTypographyProps={{ variant: 'h4', style: { fontWeight: 'bold' } }}
                        />
                        <CardContent>
                            <Typography variant="subtitle1" gutterBottom>
                                Enter the detail of the new question
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                {/* Content Field */}
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={8}
                                    size='small'
                                    variant="outlined"
                                    label="Write question content"
                                    name="content"
                                    value={question.content}
                                    onChange={handleChange}
                                    required
                                    sx={{ mb: 2 }}
                                />

                                {/* Options */}
                                <Grid container spacing={2}>
                                    {[1, 2, 3, 4].map((index) => (
                                        <Grid item xs={6} key={index}>
                                            <TextField
                                                fullWidth
                                                size='small'
                                                variant="outlined"
                                                label={`Enter Option${index}`}
                                                name={`option${index}`}
                                                value={question[`option${index}`]}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Grid>
                                    ))}
                                </Grid>

                                {/* Answer */}
                                <FormControl className='w-full' variant="filled">
                            <InputLabel color='primary' id="demo-simple-select-filled-label">Enter Answer *</InputLabel>
                                <Select
                                    fullWidth
                                    variant="outlined"
                                    labelId='demo-simple-select-filled-label'
                                    label="Select Answer"
                                    name="answer"
                                    size='small'
                                    value={question.answer}
                                    onChange={handleChange}
                                    required
                                    sx={{ mt: 2 }}
                                >
                                    <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                    {[1, 2, 3, 4].map((index) => (
                                        <MenuItem key={index} value={question[`option${index}`]}>
                                            {`option${index}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                                </FormControl>

                                {/* Submit Button */}
                                <Container sx={{ textAlign: 'center', mt: 2 }}>
                                    <Button type="submit" variant="contained" color="primary">
                                        Add
                                    </Button>
                                </Container>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </div>
    )
}
