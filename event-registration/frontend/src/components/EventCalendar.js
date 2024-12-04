// src/components/EventCalendar.js
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Paper, 
  Typography, 
  Box,
  Card,
  CardContent,
  IconButton,
  useTheme,
  Alert
} from '@mui/material';
import { 
  ChevronLeft as ChevronLeftIcon, 
  ChevronRight as ChevronRightIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';

const EventCalendar = ({ events, showEmptyMessage = false, filterType = 'all' }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();
  const [currentDate, setCurrentDate] = React.useState(new Date());

  // Get the first day of the month
  const firstDayOfMonth = useMemo(() => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  }, [currentDate]);

  // Get the last day of the month
  const lastDayOfMonth = useMemo(() => {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  }, [currentDate]);

  // Calculate calendar grid days
  const calendarDays = useMemo(() => {
    const days = [];
    const startDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();
    
    // Add previous month's days
    for (let i = 0; i < startDay; i++) {
      const prevMonthDay = new Date(firstDayOfMonth);
      prevMonthDay.setDate(prevMonthDay.getDate() - (startDay - i));
      days.push({ date: prevMonthDay, isCurrentMonth: false });
    }
    
    // Add current month's days
    for (let i = 1; i <= totalDays; i++) {
      const currentDay = new Date(firstDayOfMonth);
      currentDay.setDate(i);
      days.push({ date: currentDay, isCurrentMonth: true });
    }
    
    // Add next month's days to complete the grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonthDay = new Date(lastDayOfMonth);
      nextMonthDay.setDate(lastDayOfMonth.getDate() + i);
      days.push({ date: nextMonthDay, isCurrentMonth: false });
    }
    
    return days;
  }, [firstDayOfMonth, lastDayOfMonth]);

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date + 'T00:00:00');
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const isRegisteredForEvent = (event) => {
    return event.registrations?.some(reg => reg.user.id === user?.id);
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const handleEventClick = (event) => {
    navigate(`/events/${event.url_name}`);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  // Show message if no events match the filter
  if (events.length === 0 && showEmptyMessage) {
    return (
      <Box sx={{ mt: 2 }}>
        <Alert severity="info">
          {filterType === 'registered' 
            ? "You haven't registered for any events yet."
            : "No available events found."}
        </Alert>
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 4 }}>
      {/* Calendar Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4 
      }}>
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={handlePrevMonth} size="small">
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={handleNextMonth} size="small">
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Calendar Grid */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)', 
        gap: 1 
      }}>
        {/* Weekday headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Box 
            key={day} 
            sx={{ 
              p: 1, 
              textAlign: 'center', 
              fontWeight: 'medium' 
            }}
          >
            {day}
          </Box>
        ))}

        {/* Calendar days */}
        {calendarDays.map(({ date, isCurrentMonth }, index) => {
          const dayEvents = getEventsForDate(date);
          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <Box
              key={index}
              sx={{
                minHeight: '120px',
                p: 1,
                border: 1,
                borderColor: isCurrentMonth 
                  ? 'divider'
                  : 'action.hover',
                borderRadius: 1,
                backgroundColor: isCurrentMonth 
                  ? 'background.paper' 
                  : 'action.hover',
                ...(isToday && {
                  borderColor: 'primary.main',
                  borderWidth: 2,
                })
              }}
            >
              <Typography
                sx={{
                  width: 28,
                  height: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  ...(isToday && {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                  })
                }}
              >
                {date.getDate()}
              </Typography>
              
              <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {dayEvents.map(event => {
                  const isRegistered = isRegisteredForEvent(event);
                  return (
                    <Card
                      key={event.id}
                      onClick={() => handleEventClick(event)}
                      sx={{
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 2,
                          backgroundColor: 'action.hover'
                        }
                      }}
                    >
                      <CardContent sx={{ p: '8px !important' }}>
                        <Box>
                          <Typography 
                            variant="subtitle2" 
                            noWrap 
                            sx={{ fontWeight: 500 }}
                          >
                            {event.title}
                          </Typography>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 0.5 
                          }}>
                            <AccessTimeIcon sx={{ fontSize: 16 }} />
                            <Typography variant="caption">
                              {formatTime(event.time)}
                            </Typography>
                            {isRegistered && (
                              <CheckCircleIcon
                                sx={{
                                  color: 'success.main',
                                  fontSize: 16,
                                  ml: 0.5
                                }}
                              />
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default EventCalendar;