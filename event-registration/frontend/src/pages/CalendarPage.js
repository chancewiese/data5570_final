// src/components/CalendarPage.js
import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Alert, 
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import axios from '../utils/axios';
import EventCalendar from '../components/EventCalendar';
import { useAuth } from '../context/AuthContext';

const CalendarPage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events/');
        setEvents(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const filteredEvents = events.filter(event => {
    const isRegistered = event.registrations?.some(reg => reg.user.id === user?.id);
    switch (filter) {
      case 'registered':
        return isRegistered;
      case 'unregistered':
        return !isRegistered;
      default:
        return true;
    }
  });

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Event Calendar
        </Typography>
        
        {user && (
          <Box sx={{ mt: 2 }}>
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={handleFilterChange}
              aria-label="event filter"
              size="small"
            >
              <ToggleButton value="all" aria-label="all events">
                All Events
              </ToggleButton>
              <ToggleButton value="registered" aria-label="registered events">
                My Registrations
              </ToggleButton>
              <ToggleButton value="unregistered" aria-label="unregistered events">
                Not Registered
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        )}
      </Box>
      
      <EventCalendar 
        events={filteredEvents}
        showEmptyMessage={filter !== 'all'}
        filterType={filter}
      />
    </Container>
  );
};

export default CalendarPage;