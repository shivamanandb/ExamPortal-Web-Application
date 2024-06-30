import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createAdmin, createInstitute } from '../../services/operations/SuperAdminAPI';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Snackbar,
  CircularProgress
} from '@mui/material';
import { Alert } from '@mui/material';

const CreateInstituteAdmin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    name: '' // Institute name
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const { token } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const createdInstitute = await createInstitute({ name: formData.name }, token);
      ////console.log('Created Institute:', createdInstitute);

      const createdAdmin = await createAdmin({
        ...formData,
        institute: createdInstitute
      }, token);
      ////console.log('Created Admin:', createdAdmin);

      setSnackbar({
        open: true,
        message: 'Institute and Admin created successfully',
        severity: 'success'
      });
      // Reset form after successful submission
      setFormData({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        name: ''
      });
    } catch (error) {
      console.error('Error creating Institute or Admin:', error);
      setSnackbar({
        open: true,
        message: 'Error creating Institute or Admin',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="md" className="mt-8">
      <Paper elevation={3} className="p-8">
        <Typography variant="h4" component="h1" className="text-center mb-6 text-blue-600 font-bold">
          Create Institute Admin
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Institute Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
                className="mt-4"
              >
                {loading ? <CircularProgress size={24} /> : 'Create Admin'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateInstituteAdmin;