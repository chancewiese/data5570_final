import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import axios from '../utils/axios';
import { 
  Search,
  CalendarDays,
  Users,
  Bell,
  QrCode,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';
import heroBanner from '../assets/images/hero/booths.jpg';
import { 
  Button,
  Typography,
  Box,
  Container,
  Paper,
  InputBase,
  IconButton,
  Grid,
  Card,
  CardContent,
  useTheme
} from '@mui/material';

export default function HomePage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef(null);

  // Add click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async (value) => {
    if (!value.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    try {
      const response = await axios.get(`/api/events/?search=${value}`);
      setSearchResults(response.data.slice(0, 5));
      setShowResults(true);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setTimeout(() => handleSearch(value), 300);
  };

  const handleResultClick = (urlName) => {
    navigate(`/events/${urlName}`);
    setShowResults(false);
    setSearchTerm('');
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return new Date(0, 0, 0, hours, minutes).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const features = [
    {
      icon: <CalendarDays className="w-8 h-8" />,
      title: "Easy Event Management",
      description: "Create and manage events with just a few clicks. Set dates, capacity, and location all in one place."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Simple Registration",
      description: "Quick and hassle-free registration process for attendees. Track registrations in real-time."
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Event Updates",
      description: "Keep attendees informed with automatic notifications about event changes and reminders."
    },
    {
      icon: <QrCode className="w-8 h-8" />,
      title: "QR Code Check-in",
      description: "Generate unique QR codes for each registration to streamline the check-in process."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Secure Platform",
      description: "Your data is protected with our secure authentication and data protection measures."
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Communication Tools",
      description: "Built-in messaging system to communicate with attendees before and after events."
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{
        position: 'relative',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1
        }
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }
        }}>
          <img src={heroBanner} alt="Event exhibition booths" />
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center', color: 'common.white' }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to EventFlow
            </Typography>
            <Typography variant="h5" sx={{ mb: 6 }}>
              From registration to check-in, we make organizing events simple.
              Create, manage, and track your events all in one place.
            </Typography>

            {/* Search Container */}
            <Box 
              ref={searchContainerRef}
              sx={{ 
                position: 'relative', 
                maxWidth: 600, 
                mx: 'auto', 
                mb: 4 
              }}
            >
              {/* Search Bar */}
              <Paper sx={{ p: 0.5, display: 'flex' }}>
                <InputBase
                  fullWidth
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onClick={() => {
                    if (searchTerm.trim() && searchResults.length > 0) {
                      setShowResults(true);
                    }
                  }}
                  sx={{ ml: 2 }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      navigate(`/events?search=${searchTerm}`);
                      setShowResults(false);
                    }
                  }}
                />
                <IconButton 
                  onClick={() => {
                    navigate(`/events?search=${searchTerm}`);
                    setShowResults(false);
                  }}
                >
                  <Search />
                </IconButton>
              </Paper>

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <Paper sx={{
                  position: 'absolute',
                  width: '100%',
                  mt: '2px',
                  maxHeight: 400,
                  overflow: 'auto',
                  zIndex: 1300,
                  boxShadow: theme.shadows[3]
                }}>
                  {searchResults.map((event) => (
                    <Box
                      key={event.id}
                      onClick={() => handleResultClick(event.url_name)}
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        '&:hover': {
                          bgcolor: theme.palette.action.hover
                        }
                      }}
                    >
                      <Typography variant="subtitle1">
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(event.date).toLocaleDateString()} at {formatTime(event.time)}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              )}
            </Box>

            {/* CTA Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                onClick={() => navigate('/events')}
                sx={{ 
                  bgcolor: 'common.white', 
                  color: 'primary.main',
                  '&:hover': { 
                    bgcolor: 'grey.100',
                    transform: 'translateY(-2px)',
                    transition: 'transform 0.2s'
                  }
                }}
              >
                Browse Events
              </Button>
              
              {!user && (
                <Button
                  variant="contained"
                  onClick={() => navigate('/register')}
                  color="primary"
                  sx={{
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      transition: 'transform 0.2s'
                    }
                  }}
                >
                  Sign Up Now
                </Button>
              )}
              
              {user?.is_staff && (
                <Button
                  variant="contained"
                  onClick={() => navigate('/events/create')}
                  color="secondary"
                  sx={{
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      transition: 'transform 0.2s'
                    }
                  }}
                >
                  Create Event
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ 
        bgcolor: theme.palette.mode === 'light' ? 'grey.50' : 'background.paper',
        py: 8 
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" gutterBottom>
              Why Choose Our Platform?
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Everything you need to successfully manage your events
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card sx={{
                  height: '100%',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[6]
                  }
                }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ 
                      color: 'primary.main',
                      mb: 2,
                      '& > svg': {
                        width: 40,
                        height: 40
                      }
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}