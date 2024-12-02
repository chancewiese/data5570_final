// src/pages/EventsPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../utils/axios';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import EventCard from '../components/EventCard';

const EventsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events/');
      setEvents(response.data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events
    .filter(event => {
      // Search filter
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      switch (filter) {
        case 'upcoming':
          return matchesSearch && new Date(event.date) > new Date();
        case 'past':
          return matchesSearch && new Date(event.date) < new Date();
        case 'registered':
          return matchesSearch && event.registrations?.some(reg => reg.user.id === user?.id);
        default:
          return matchesSearch;
      }
    })
    .sort((a, b) => {
      // Sort logic
      switch (sortBy) {
        case 'date':
          return new Date(a.date) - new Date(b.date);
        case 'name':
          return a.title.localeCompare(b.title);
        case 'availability':
          const aAvailable = a.capacity - (a.registrations?.length || 0);
          const bAvailable = b.capacity - (b.registrations?.length || 0);
          return bAvailable - aAvailable;
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1">
          Events
        </Typography>
        {user?.is_staff && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate('/events/create')}
          >
            Add Event
          </Button>
        )}
      </Box>

      {/* Search and Filter Section */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="all">All Events</MenuItem>
                <MenuItem value="upcoming">Upcoming</MenuItem>
                <MenuItem value="past">Past</MenuItem>
                <MenuItem value="registered">My Registrations</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="date">Sort by Date</MenuItem>
                <MenuItem value="name">Sort by Name</MenuItem>
                <MenuItem value="availability">Sort by Availability</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Events Grid */}
      <Grid container spacing={3}>
        {filteredEvents.map(event => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <EventCard 
              event={event}
              isRegistered={event.registrations?.some(reg => reg.user.id === user?.id)}
              currentUser={user}
            />
          </Grid>
        ))}
        {filteredEvents.length === 0 && !loading && (
          <Grid item xs={12}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No events found
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default EventsPage;