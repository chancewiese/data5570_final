// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Typography,
  Button,
  Box
} from '@mui/material';
import { EventNote as EventIcon } from '@mui/icons-material';

const HomePage = () => {
  const { user } = useAuth();
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          py: 8
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Event Registration
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 4 }}>
          Browse and register for upcoming events {user?.is_staff && ' or manage your event listings'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            component={Link}
            to="/events"
            variant="contained"
            size="large"
            startIcon={<EventIcon />}
          >
            View Events
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;