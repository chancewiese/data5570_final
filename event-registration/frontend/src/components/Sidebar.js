// src/components/Sidebar.js
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Typography,
  Collapse,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Event as EventIcon,
  AccountCircle as AccountIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
  Palette as PaletteIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  ExpandLess,
  ExpandMore,
  Monitor as MonitorIcon,
  CalendarMonth as CalendarIcon
} from '@mui/icons-material';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { themeMode, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  
  // Reset dropdowns when sidebar closes
  useEffect(() => {
    if (!open) {
      setThemeOpen(false);
    }
  }, [open]);

  // Set initial theme to system on component mount
  useEffect(() => {
    if (!themeMode) {
      setTheme('system');
    }
  }, [themeMode, setTheme]);

  const toggleDrawer = (isOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(isOpen);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/login');
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Events', icon: <EventIcon />, path: '/events' },
    { text: 'Calendar', icon: <CalendarIcon />, path: '/calendar' },
    ...(user ? [{ text: 'Account', icon: <AccountIcon />, path: '/account' }] : [])
  ];

  const DrawerContent = (
    <Box sx={{ 
      width: 250, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <EventIcon />
        <Typography variant="h6">EventFlow</Typography>
      </Box>
      
      <Divider />

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={() => setOpen(false)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disablePadding>
          <ListItemButton onClick={() => setThemeOpen(!themeOpen)}>
            <ListItemIcon>
              <PaletteIcon />
            </ListItemIcon>
            <ListItemText primary="Theme" />
            {themeOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        
        <Collapse in={themeOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem disablePadding>
              <ListItemButton 
                onClick={() => setTheme(themeMode === 'dark' ? 'light' : 'dark')}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                </ListItemIcon>
                <ListItemText primary={`${themeMode === 'dark' ? 'Light' : 'Dark'} Mode`} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton 
                onClick={() => setTheme('system')}
                selected={themeMode === 'system'}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <MonitorIcon />
                </ListItemIcon>
                <ListItemText primary="Use System Theme" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
      </List>

      <Divider />
      
      <ListItem disablePadding>
        {user ? (
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        ) : (
          <ListItemButton
            component={Link}
            to="/login"
            onClick={() => setOpen(false)}
          >
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItemButton>
        )}
      </ListItem>
    </Box>
  );

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ ml: -1 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
      >
        {DrawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;