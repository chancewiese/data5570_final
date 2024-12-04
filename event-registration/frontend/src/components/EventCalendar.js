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
  useTheme
} from '@mui/material';
import { 
  ChevronLeft as ChevronLeftIcon, 
  ChevronRight as ChevronRightIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon
} from '@mui/icons-material';

const EventCalendar = ({ events }) => {
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

  return (
    <Paper className="p-4">
      {/* Calendar Header */}
      <Box className="flex items-center justify-between mb-4">
        <Typography variant="h5" className="font-semibold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Typography>
        <Box className="flex items-center gap-2">
          <IconButton onClick={handlePrevMonth} size="small">
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={handleNextMonth} size="small">
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Calendar Grid */}
      <Box className="grid grid-cols-7 gap-2">
        {/* Weekday headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Box key={day} className="p-2 text-center font-semibold">
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
              className={`min-h-32 p-1 border rounded-lg ${
                isCurrentMonth 
                  ? 'border-gray-200 dark:border-gray-700' 
                  : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800'
              } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
              sx={{
                backgroundColor: isCurrentMonth 
                  ? theme.palette.background.paper 
                  : theme.palette.action.hover
              }}
            >
              <Typography
                className={`text-sm p-1 rounded-full w-7 h-7 flex items-center justify-center ${
                  isToday ? 'bg-blue-500 text-white' : ''
                }`}
              >
                {date.getDate()}
              </Typography>
              
              <Box className="space-y-1 mt-1">
                {dayEvents.map(event => {
                  const isRegistered = isRegisteredForEvent(event);
                  return (
                    <Card
                      key={event.id}
                      onClick={() => handleEventClick(event)}
                      sx={{
                        backgroundColor: theme.palette.background.paper,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: theme.shadows[4],
                          backgroundColor: theme.palette.action.hover
                        }
                      }}
                    >
                      <CardContent className="p-2">
                        <Box>
                          <Typography variant="subtitle2" noWrap className="font-medium">
                            {event.title}
                          </Typography>
                          <Box className="flex items-center gap-1">
                            <AccessTimeIcon sx={{ fontSize: '1rem' }} />
                            <Typography variant="caption">
                              {formatTime(event.time)}
                            </Typography>
                            {isRegistered && (
                              <CheckCircleIcon
                                sx={{
                                  color: theme.palette.success.main,
                                  fontSize: '1rem',
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