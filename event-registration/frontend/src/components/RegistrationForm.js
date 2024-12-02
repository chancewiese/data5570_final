// src/components/RegistrationForm.js
import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material';

const RegistrationForm = ({ eventId, onRegister }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            required
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Button 
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Register for Event
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default RegistrationForm;