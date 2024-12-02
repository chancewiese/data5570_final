// src/components/EventForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Paper,
  TextField,
  Button,
  Box,
  Grid,
  Alert,
  CircularProgress,
  FormControl,
  Typography,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import axios from '../utils/axios';

const EventForm = ({ event = null, isEdit = false, onCancel }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noLimit, setNoLimit] = useState(event?.capacity === null);
  
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    date: event?.date || today,
    time: event?.time || '12:00',
    capacity: event?.capacity || '',
    location: event?.location || '',
    url_name: event?.url_name || ''
  });

  // Update noLimit state when event prop changes
  useEffect(() => {
    setNoLimit(event?.capacity === null);
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateUrlName = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      url_name: generateUrlName(title)
    }));
  };

  const handleNoLimitChange = (e) => {
    const checked = e.target.checked;
    setNoLimit(checked);
    if (checked) {
      setFormData(prev => ({
        ...prev,
        capacity: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const eventData = {
        ...formData,
        capacity: noLimit ? null : parseInt(formData.capacity)
      };

      console.log('Submitting event data:', eventData); // Debug log

      if (isEdit) {
        await axios.put(`/api/events/${event.url_name}/`, eventData);
      } else {
        await axios.post('/api/events/', eventData);
      }
      
      navigate('/events');
    } catch (err) {
      console.error('Event submission error:', err);
      setError(err.response?.data?.detail || 'Failed to submit event');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/events');
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <FormControl fullWidth>
            <TextField
              required
              label="Event Title"
              name="title"
              value={formData.title}
              onChange={handleTitleChange}
              disabled={loading}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="URL Name"
              name="url_name"
              value={formData.url_name}
              onChange={handleChange}
              helperText="URL-friendly name for the event"
              disabled={loading}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              required
              multiline
              rows={4}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={loading}
            />
          </FormControl>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography component="label" htmlFor="date" sx={{ mb: 1 }}>
                  Event Date*
                </Typography>
                <TextField
                  required
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  disabled={loading}
                  inputProps={{
                    min: today
                  }}
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Typography component="label" htmlFor="time" sx={{ mb: 1 }}>
                  Event Time*
                </Typography>
                <TextField
                  required
                  id="time"
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  disabled={loading}
                  fullWidth
                />
              </FormControl>
            </Grid>
          </Grid>

          <FormControl fullWidth>
            <TextField
              required
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              disabled={loading}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormControlLabel
              control={
                <Checkbox
                  checked={noLimit}
                  onChange={handleNoLimitChange}
                  disabled={loading}
                />
              }
              label="No capacity limit"
            />
            {!noLimit && (
              <TextField
                required
                type="number"
                label="Capacity"
                name="capacity"
                value={formData.capacity || ''}
                onChange={handleChange}
                disabled={loading}
                inputProps={{ min: 1 }}
                sx={{ mt: 1 }}
              />
            )}
          </FormControl>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <Button
              type="button"
              variant="outlined"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : isEdit ? 'Update Event' : 'Create Event'}
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default EventForm;