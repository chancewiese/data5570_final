import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCallback, useState, useEffect, useRef } from 'react';
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
import debounce from 'lodash/debounce';
import { Button } from '@mui/material';

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // Handle click outside of search
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const debouncedSearch = useCallback(
    debounce((value) => handleSearch(value), 300),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
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
      icon: <CalendarDays className="w-8 h-8 mb-4 text-warmOrange dark:text-peach" />,
      title: "Easy Event Management",
      description: "Create and manage events with just a few clicks. Set dates, capacity, and location all in one place."
    },
    {
      icon: <Users className="w-8 h-8 mb-4 text-warmOrange dark:text-peach" />,
      title: "Simple Registration",
      description: "Quick and hassle-free registration process for attendees. Track registrations in real-time."
    },
    {
      icon: <Bell className="w-8 h-8 mb-4 text-warmOrange dark:text-peach" />,
      title: "Event Updates",
      description: "Keep attendees informed with automatic notifications about event changes and reminders."
    },
    {
      icon: <QrCode className="w-8 h-8 mb-4 text-warmOrange dark:text-peach" />,
      title: "QR Code Check-in",
      description: "Generate unique QR codes for each registration to streamline the check-in process."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 mb-4 text-warmOrange dark:text-peach" />,
      title: "Secure Platform",
      description: "Your data is protected with our secure authentication and data protection measures."
    },
    {
      icon: <MessageCircle className="w-8 h-8 mb-4 text-warmOrange dark:text-peach" />,
      title: "Communication Tools",
      description: "Built-in messaging system to communicate with attendees before and after events."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Event exhibition booths"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
              Streamline Your Event Management
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-white">
              From registration to check-in, we make organizing events simple. 
              Create, manage, and track your events all in one place.
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto relative" ref={searchRef}>
              <div className="flex items-center justify-center bg-white dark:bg-slate rounded-lg p-1 shadow-lg">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search events..."
                  className="w-full px-4 py-2 text-charcoal dark:text-white placeholder-warmGray dark:placeholder-sand/70 bg-transparent focus:outline-none rounded-lg"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      navigate(`/events?search=${searchTerm}`);
                      setShowResults(false);
                    }
                  }}
                />
                <button 
                  className="p-2 text-warmOrange hover:text-coral dark:text-sand dark:hover:text-peach transition-colors"
                  onClick={() => {
                    navigate(`/events?search=${searchTerm}`);
                    setShowResults(false);
                  }}
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute w-full mt-2 bg-white dark:bg-slate rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                  <div className="p-2">
                    {searchResults.map((event) => (
                      <div
                        key={event.id}
                        onClick={() => handleResultClick(event.url_name)}
                        className="p-3 hover:bg-sand/50 dark:hover:bg-warmGray/20 cursor-pointer rounded-md"
                      >
                        <div className="font-medium text-charcoal dark:text-white">
                          {event.title}
                        </div>
                        <div className="text-sm text-warmGray dark:text-sand">
                          {new Date(event.date).toLocaleDateString()} at {formatTime(event.time)}
                        </div>
                      </div>
                    ))}
                    <div 
                      className="p-2 text-center border-t border-sand dark:border-warmGray/20 text-warmOrange dark:text-peach cursor-pointer hover:bg-sand/50 dark:hover:bg-warmGray/20"
                      onClick={() => {
                        navigate(`/events?search=${searchTerm}`);
                        setShowResults(false);
                      }}
                    >
                      View all results
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Button
                variant="contained"
                onClick={() => navigate('/events')}
                sx={{ backgroundColor: 'white', color: 'warmOrange', '&:hover': { backgroundColor: '#F7E2D0' } }}
              >
                Browse Events
              </Button>
              
              {!user && (
                <Button
                  variant="contained"
                  onClick={() => navigate('/register')}
                  color="primary"
                >
                  Sign Up Now
                </Button>
              )}
              
              {user?.is_staff && (
                <Button
                  variant="contained"
                  onClick={() => navigate('/events/create')}
                  color="secondary"
                >
                  Create Event
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-cream dark:bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal dark:text-white">
              Why Choose Our Platform?
            </h2>
            <p className="mt-4 text-lg text-warmGray dark:text-sand">
              Everything you need to successfully manage your events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-slate rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-2 text-charcoal dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-warmGray dark:text-sand">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}