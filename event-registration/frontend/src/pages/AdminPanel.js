// src/pages/AdminPanel.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { addEvent, updateEvent, deleteEvent } from '../features/events/eventsSlice';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const events = useSelector(state => state.events.events);
  const [open, setOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    urlName: '',
    capacity: ''
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      urlName: '',
      capacity: ''
    });
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date.split('T')[0],
      time: event.time,
      urlName: event.urlName,
      capacity: event.capacity
    });
    setOpen(true);
  };

  const handleDelete = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      dispatch(deleteEvent(eventId));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      urlName: formData.urlName || formData.title.toLowerCase().replace(/\s+/g, '-'),
      id: editingEvent ? editingEvent.id : Date.now()
    };

    if (editingEvent) {
      dispatch(updateEvent(eventData));
    } else {
      dispatch(addEvent(eventData));
    }
    
    handleClose();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Event Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
        >
          Create New Event
        </Button>
      </Box>

      <Paper elevation={2}>
        <List>
          {events.map((event) => (
            <ListItem key={event.id} divider>
              <ListItemText
                primary={event.title}
                secondary={`${event.date} at ${event.time}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleEdit(event)} sx={{ mr: 1 }}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDelete(event.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingEvent ? 'Edit Event' : 'Create New Event'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                required
                label="Event Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="URL Name (optional)"
                name="urlName"
                value={formData.urlName}
                onChange={handleChange}
                fullWidth
                helperText="Leave blank to auto-generate from title"
              />
              <TextField
                required
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
              />
              <TextField
                required
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                required
                label="Time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                required
                label="Capacity"
                name="capacity"
                type="number"
                value={formData.capacity}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {editingEvent ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default AdminPanel;