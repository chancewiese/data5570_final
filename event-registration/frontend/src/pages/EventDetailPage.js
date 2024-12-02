// src/pages/EventDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../utils/axios';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  Stack
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Group as GroupIcon
} from '@mui/icons-material';
import EventForm from '../components/EventForm';

const EventDetailPage = () => {
  const { urlName } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);

  const fetchEventData = async () => {
    try {
      const response = await axios.get(`/api/events/${urlName}/`);
      setEvent(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching event:', err);
      setError('Failed to load event details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [urlName]);

  // Determine user permissions and event status
  const isAdmin = user?.is_staff;
  const registrationCount = event?.registrations?.length || 0;
  const isRegistered = event?.registrations?.some(reg => reg.user.id === user?.id) || false;
  const isFullyBooked = event?.capacity !== null && registrationCount >= (event?.capacity || 0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `${days[date.getDay()]}, ${date.toLocaleDateString()}`;
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  const getCapacityDisplay = () => {
    if (!event) return '';
    if (event.capacity === null) {
      return `${registrationCount} registered`;
    }
    return `${registrationCount}/${event.capacity}`;
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/events/${urlName}/`);
      navigate('/events');
    } catch (err) {
      console.error('Failed to delete event:', err);
      setError('Failed to delete event');
    }
    setDeleteDialogOpen(false);
  };

  const handleRegister = async () => {
    try {
      setRegistrationError(null);
      await axios.post(`/api/events/${urlName}/register/`, {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      });
      
      // Refresh event data after registration
      await fetchEventData();
    } catch (err) {
      console.error('Failed to register:', err);
      setRegistrationError(err.response?.data?.detail || 'Failed to register for event');
    }
  };

  const handleCancelRegistration = async () => {
    try {
      await axios.delete(`/api/events/${urlName}/registration/`);
      // Refresh event data after cancellation
      await fetchEventData();
    } catch (err) {
      console.error('Failed to cancel registration:', err);
      setError('Failed to cancel registration');
    }
  };

  const handleEditSubmit = async (updatedEventData) => {
    try {
      await axios.put(`/api/events/${urlName}/`, updatedEventData);
      await fetchEventData();
      setEditDialogOpen(false);
    } catch (err) {
      console.error('Failed to update event:', err);
      setError('Failed to update event');
    }
  };

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

  if (!event) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Event not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        {/* Event Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {event.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarIcon sx={{ mr: 1 }} />
                <Typography>{formatDate(event.date)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TimeIcon sx={{ mr: 1 }} />
                <Typography>{formatTime(event.time)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <GroupIcon sx={{ mr: 1 }} />
                <Typography>{getCapacityDisplay()}</Typography>
              </Box>
            </Box>
          </Box>
          
          {/* Admin Actions */}
          {isAdmin && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton onClick={() => setEditDialogOpen(true)} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => setDeleteDialogOpen(true)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Box>

        {/* Event Description */}
        <Typography variant="body1" paragraph>
          {event.description}
        </Typography>

        {/* Registration Status */}
        {isFullyBooked && !isRegistered && event.capacity !== null && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            This event is fully booked
          </Alert>
        )}
        
        {registrationError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {registrationError}
          </Alert>
        )}
      </Paper>

      <Grid container spacing={4}>
        {/* Registration Form or Status */}
        <Grid item xs={12} md={6}>
          {user ? (
            isRegistered ? (
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  You're Registered!
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleCancelRegistration}
                  sx={{ mt: 2 }}
                >
                  Cancel Registration
                </Button>
              </Paper>
            ) : (
              (!isFullyBooked || event.capacity === null) && (
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Register for Event
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleRegister}
                    sx={{ mt: 2 }}
                  >
                    Register
                  </Button>
                </Paper>
              )
            )
          ) : (
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
              <Typography gutterBottom>
                Please log in to register for this event
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/login')}
                sx={{ mt: 2 }}
              >
                Log In
              </Button>
            </Paper>
          )}
        </Grid>

        {/* Registrants List (Only visible to admins) */}
        {isAdmin && (
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Registrants
            </Typography>
            <Paper elevation={2}>
              <List>
                {event.registrations?.map((registration, index) => (
                  <React.Fragment key={registration.id}>
                    {index > 0 && <Divider />}
                    <ListItem>
                      <ListItemText
                        primary={`${registration.user.first_name} ${registration.user.last_name}`}
                        secondary={registration.user.email}
                      />
                      <Chip 
                        size="small"
                        label={registration.status}
                        color={
                          registration.status === 'confirmed' ? 'success' :
                          registration.status === 'pending' ? 'warning' : 'error'
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
                {event.registrations?.length === 0 && (
                  <ListItem>
                    <ListItemText primary="No registrations yet" />
                  </ListItem>
                )}
              </List>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this event? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <EventForm 
            event={event} 
            isEdit={true} 
            onCancel={() => setEditDialogOpen(false)}
            onSubmit={handleEditSubmit}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default EventDetailPage;