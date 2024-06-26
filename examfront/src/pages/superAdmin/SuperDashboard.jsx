import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Grid, 
  Container 
} from '@mui/material';
import { 
  People as PeopleIcon, 
  PersonAdd as PersonAddIcon 
} from '@mui/icons-material';

const SuperDashboard = () => {
  return (
    <Container maxWidth="lg" className="mt-8">
      <Typography variant="h3" component="h1" className="text-center mb-8 text-blue-600 font-bold">
        Super Admin Dashboard
      </Typography>
      <div className='mt-5'></div>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card className="h-full transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <CardContent className="flex flex-col items-center text-center p-6">
              <PeopleIcon className="text-6xl mb-4 text-blue-500" />
              <Typography variant="h5" component="h2" className="mb-4 font-semibold">
                View Institute Admins
              </Typography>
              <Typography variant="body1" className="mb-6 text-gray-600">
                Manage and oversee all institute administrators in one place.
              </Typography>
              <Button 
                component={Link} 
                to="/super/admins" 
                variant="contained" 
                color="primary" 
                className="mt-auto"
              >
                View Admins
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="h-full transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <CardContent className="flex flex-col items-center text-center p-6">
              <PersonAddIcon className="text-6xl mb-4 text-green-500" />
              <Typography variant="h5" component="h2" className="mb-4 font-semibold">
                Create Institute Admin
              </Typography>
              <Typography variant="body1" className="mb-6 text-gray-600">
                Add new institute administrators to the system quickly and easily.
              </Typography>
              <Button 
                component={Link} 
                to="/super/create-admin" 
                variant="contained" 
                color="secondary" 
                className="mt-auto"
              >
                Create Admin
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SuperDashboard;