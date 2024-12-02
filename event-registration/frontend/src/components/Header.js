// src/components/Header.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import { 
  Event as EventIcon,
  AccountCircle as AccountIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Toolbar>
          <Box display="flex" alignItems="center" component={Link} to="/" sx={{ 
            textDecoration: 'none', 
            color: 'inherit' 
          }}>
            <EventIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div">
              Event Registration
            </Typography>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          {user ? (
            <>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Button
                  component={Link}
                  to="/"
                  color="inherit"
                  variant={location.pathname === '/' ? 'outlined' : 'text'}
                >
                  Home
                </Button>
                <Button
                  component={Link}
                  to="/events"
                  color="inherit"
                  variant={location.pathname.includes('/events') ? 'outlined' : 'text'}
                >
                  Events
                </Button>
                <IconButton
                  color="inherit"
                  onClick={handleMenuClick}
                  sx={{ ml: 1 }}
                >
                  <AccountIcon />
                </IconButton>
              </Box>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem 
                  onClick={() => {
                    navigate('/account');
                    handleMenuClose();
                  }}
                >
                  <AccountIcon sx={{ mr: 1 }} /> My Account
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                color="inherit"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                variant="outlined"
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;