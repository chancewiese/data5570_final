// src/components/Header.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
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
  ListItemIcon,
  ListItemText,
  Divider,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { 
  Event as EventIcon,
  AccountCircle as AccountIcon,
  Logout as LogoutIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { themeMode, setTheme } = useTheme();
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

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
    // Don't close the menu when changing theme
    event.stopPropagation();
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
                PaperProps={{
                  elevation: 3,
                  sx: { minWidth: 200 }
                }}
              >
                <MenuItem 
                  onClick={() => {
                    navigate('/account');
                    handleMenuClose();
                  }}
                >
                  <ListItemIcon>
                    <AccountIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>My Account</ListItemText>
                </MenuItem>

                <MenuItem sx={{ display: 'block' }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Theme</InputLabel>
                    <Select
                      value={themeMode}
                      label="Theme"
                      onChange={handleThemeChange}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MenuItem value="system">System</MenuItem>
                      <MenuItem value="light">Light</MenuItem>
                      <MenuItem value="dark">Dark</MenuItem>
                    </Select>
                  </FormControl>
                </MenuItem>

                <Divider />
                
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
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