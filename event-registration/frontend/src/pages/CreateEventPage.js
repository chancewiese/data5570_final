import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import EventForm from '../components/EventForm';

const CreateEventPage = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/events');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Event
        </Typography>
      </Box>
      <EventForm onCancel={handleCancel} />
    </Container>
  );
};

export default CreateEventPage;