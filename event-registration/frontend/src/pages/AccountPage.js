// src/pages/AccountPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Switch,
  Alert,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Button,
  Chip,
  Divider,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import axios from '../utils/axios';

const AccountPage = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get('/api/registrations/');
        // Remove any potential duplicates by using url_name as a unique identifier
        const uniqueRegistrations = Array.from(new Map(
          response.data.map(reg => [reg.event.url_name, reg])
        ).values());
        setRegistrations(uniqueRegistrations);
        setError(null);
      } catch (err) {
        console.error('Error fetching registrations:', err);
        setError('Failed to load your registrations');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchRegistrations();
    }
  }, [user]);

  const handleAdminToggle = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.patch(`/api/users/${user.id}/toggle_admin/`);
      updateUser(response.data);
    } catch (err) {
      console.error('Error toggling admin status:', err);
      setError('Failed to update admin status');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `${days[date.getDay()]}, ${date.toLocaleDateString()}`;
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  const handleViewEvent = (urlName) => {
    navigate(`/events/${urlName}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Profile Information
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Username:</strong> {user?.username}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {user?.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Name:</strong> {user?.first_name} {user?.last_name}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={user?.is_staff || false}
                      onChange={handleAdminToggle}
                      disabled={loading}
                    />
                  }
                  label={`Admin Status (${user?.is_staff ? 'Enabled' : 'Disabled'})`}
                />
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Your Registrations
            </Typography>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : registrations.length > 0 ? (
              <List>
                {registrations.map((registration, index) => (
                  <React.Fragment key={registration.id}>
                    {index > 0 && <Divider />}
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleViewEvent(registration.event?.url_name)}
                        >
                          View Event
                        </Button>
                      }
                    >
                      <ListItemText
                        primary={registration.event_title}
                        secondary={
                          <React.Fragment>
                            {registration.event && (
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {formatDate(registration.event.date)} at {formatTime(registration.event.time)}
                              </Typography>
                            )}
                            <Box sx={{ mt: 1 }}>
                              <Chip
                                size="small"
                                label={registration.status}
                                color={
                                  registration.status === 'confirmed' ? 'success' :
                                  registration.status === 'pending' ? 'warning' : 'error'
                                }
                              />
                            </Box>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography color="text.secondary">
                You haven't registered for any events yet.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountPage;