// src/components/EventCard.js
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box,
  Chip,
  Stack
} from '@mui/material';
import { 
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Group as GroupIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event, isRegistered = false, currentUser }) => {
  const navigate = useNavigate();
  const registrationCount = event?.registrations?.length || 0;
  const isFullyBooked = event.capacity !== null && registrationCount >= event.capacity;
  const isAdmin = currentUser?.is_staff;

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
    if (event.capacity === null) {
      return `${registrationCount} registered`;
    }
    return `${registrationCount}/${event.capacity}`;
  };

  const handleViewDetails = () => {
    navigate(`/events/${event.url_name}`);
  };

  return (
    <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {event.title}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CalendarIcon sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {formatDate(event.date)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TimeIcon sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {formatTime(event.time)}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {event.description}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              icon={<GroupIcon />}
              label={getCapacityDisplay()}
              color="primary"
              size="small"
            />
            {isRegistered && (
              <Chip
                label="Registered"
                color="success"
                size="small"
              />
            )}
          </Stack>
          
          <Button
            onClick={handleViewDetails}
            variant="contained"
            color="primary"
            size="small"
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;