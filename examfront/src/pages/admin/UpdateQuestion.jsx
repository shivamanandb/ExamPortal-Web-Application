import React from 'react'

export const UpdateQuestion = () => {
  return (
    <div>UpdateQuestion</div>
  )
}


// import { Button, Card, CardContent, CardHeader, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
// import React, { useEffect } from 'react'
// import { useForm } from 'react-hook-form';
// import { useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { updateQuestion , getQuestion } from '../../services/operations/questionAPI';

// export const UpdateQuestion = () => {
//     const { quesId } = useParams();
//     const { token } = useSelector((state) => state.auth);
//     const navigate = useNavigate();

//     const { register, handleSubmit, setValue, formState: { errors } } = useForm();

//     useEffect(() => {
//         const questionDetails = async () => {
//             try {
//                 const res = await getQuestion(quesId, token);
//                 Object.keys(res).forEach(key => {
//                     setValue(key, res[key]);
//                 });
//             } catch (error) {
//                 alert("Something went wrong");
//             }
//         }
//         questionDetails();
//     }, [quesId, token, setValue]);

//     const onSubmit = async (data) => {
//         await updateQuestion(quesId, data, token);
//     };

//     return (
//         <div>
//             <Grid>
//                 <Grid item xs={12}>
//                     <Card variant="outlined">
//                         <CardHeader
//                             title="Update Section"
//                             titleTypographyProps={{ variant: 'h4', style: { fontWeight: 'bold' } }}
//                         />
//                         <CardContent>
//                             <Typography variant="subtitle1" gutterBottom>
//                                 Enter the detail of the question
//                             </Typography>
//                             <form onSubmit={handleSubmit(onSubmit)}>
//                                 {/* Content Field */}
//                                 <TextField
//                                     fullWidth
//                                     multiline
//                                     rows={8}
//                                     size='small'
//                                     variant="outlined"
//                                     label="Write question content"
//                                     {...register("content")}
//                                     required
//                                     sx={{ mb: 2 }}
//                                 />

//                                 {/* Options */}
//                                 <Grid container spacing={2}>
//                                     {[1, 2, 3, 4].map((index) => (
//                                         <Grid item xs={6} key={index}>
//                                             <TextField
//                                                 fullWidth
//                                                 size='small'
//                                                 variant="outlined"
//                                                 label={`Enter Option${index}`}
//                                                 {...register(`option${index}`)}
//                                                 required
//                                             />
//                                         </Grid>
//                                     ))}
//                                 </Grid>

//                                 {/* Answer */}
//                                 <FormControl className='w-full' variant="filled">
//                                     <InputLabel color='primary' id="demo-simple-select-filled-label">Enter Answer *</InputLabel>
//                                     <Select
//                                         fullWidth
//                                         variant="outlined"
//                                         labelId='demo-simple-select-filled-label'
//                                         label="Select Answer"
//                                         {...register("answer")}
//                                         size='small'
//                                         required
//                                         sx={{ mt: 2 }}
//                                     >
//                                         <MenuItem value="">
//                                             <em>None</em>
//                                         </MenuItem>
//                                         {[1, 2, 3, 4].map((index) => (
//                                             <MenuItem key={index} value={`option${index}`}>
//                                                 {`option${index}`}
//                                             </MenuItem>
//                                         ))}
//                                     </Select>
//                                 </FormControl>

//                                 {/* Submit Button */}
//                                 <Container sx={{ textAlign: 'center', mt: 2 }}>
//                                     <Button type="submit" variant="contained" color="primary">
//                                         Add
//                                     </Button>
//                                 </Container>
//                             </form>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>
//         </div>
//     )
// }
