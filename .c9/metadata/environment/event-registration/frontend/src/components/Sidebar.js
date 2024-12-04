{"filter":false,"title":"Sidebar.js","tooltip":"/event-registration/frontend/src/components/Sidebar.js","undoManager":{"mark":13,"position":13,"stack":[[{"start":{"row":0,"column":0},"end":{"row":167,"column":23},"action":"insert","lines":["// src/components/Sidebar.js","import React, { useState } from 'react';","import { Link, useLocation, useNavigate } from 'react-router-dom';","import { useAuth } from '../context/AuthContext';","import { useTheme } from '../context/ThemeContext';","import {","  Drawer,","  List,","  ListItem,","  ListItemButton,","  ListItemIcon,","  ListItemText,","  Box,","  IconButton,","  Typography,","  Collapse,","  Select,","  MenuItem,","  FormControl,","  InputLabel,","  Divider","} from '@mui/material';","import {","  Menu as MenuIcon,","  Home as HomeIcon,","  Event as EventIcon,","  AccountCircle as AccountIcon,","  Logout as LogoutIcon,","  Login as LoginIcon,","  Settings as SettingsIcon,","  Palette as PaletteIcon,","  ExpandLess,","  ExpandMore","} from '@mui/icons-material';","","const Sidebar = () => {","  const location = useLocation();","  const navigate = useNavigate();","  const { user, logout } = useAuth();","  const { themeMode, setTheme } = useTheme();","  const [open, setOpen] = useState(false);","  const [themeOpen, setThemeOpen] = useState(false);","","  const toggleDrawer = (isOpen) => (event) => {","    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {","      return;","    }","    setOpen(isOpen);","  };","","  const handleLogout = () => {","    logout();","    setOpen(false);","    navigate('/login');","  };","","  const handleThemeChange = (event) => {","    setTheme(event.target.value);","    event.stopPropagation();","  };","","  const menuItems = [","    { text: 'Home', icon: <HomeIcon />, path: '/' },","    { text: 'Events', icon: <EventIcon />, path: '/events' },","    ...(user ? [{ text: 'Account', icon: <AccountIcon />, path: '/account' }] : [])","  ];","","  const DrawerContent = (","    <Box sx={{ width: 280, height: '100%', display: 'flex', flexDirection: 'column' }}>","      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>","        <EventIcon />","        <Typography variant=\"h6\">Event Registration</Typography>","      </Box>","      ","      <Divider />","","      <List sx={{ flexGrow: 1 }}>","        {menuItems.map((item) => (","          <ListItem key={item.text} disablePadding>","            <ListItemButton","              component={Link}","              to={item.path}","              selected={location.pathname === item.path}","              onClick={() => setOpen(false)}","            >","              <ListItemIcon>{item.icon}</ListItemIcon>","              <ListItemText primary={item.text} />","            </ListItemButton>","          </ListItem>","        ))}","","        <ListItem disablePadding>","          <ListItemButton onClick={() => setThemeOpen(!themeOpen)}>","            <ListItemIcon>","              <PaletteIcon />","            </ListItemIcon>","            <ListItemText primary=\"Theme\" />","            {themeOpen ? <ExpandLess /> : <ExpandMore />}","          </ListItemButton>","        </ListItem>","        ","        <Collapse in={themeOpen} timeout=\"auto\" unmountOnExit>","          <List component=\"div\" disablePadding>","            <ListItem sx={{ pl: 4 }}>","              <FormControl fullWidth size=\"small\">","                <InputLabel>Theme Mode</InputLabel>","                <Select","                  value={themeMode}","                  label=\"Theme Mode\"","                  onChange={handleThemeChange}","                  onClick={(e) => e.stopPropagation()}","                >","                  <MenuItem value=\"light\">Light</MenuItem>","                  <MenuItem value=\"dark\">Dark</MenuItem>","                  <MenuItem value=\"system\">System</MenuItem>","                </Select>","              </FormControl>","            </ListItem>","          </List>","        </Collapse>","      </List>","","      <Divider />","      ","      {user ? (","        <ListItemButton onClick={handleLogout}>","          <ListItemIcon>","            <LogoutIcon />","          </ListItemIcon>","          <ListItemText primary=\"Logout\" />","        </ListItemButton>","      ) : (","        <ListItemButton","          component={Link}","          to=\"/login\"","          onClick={() => setOpen(false)}","        >","          <ListItemIcon>","            <LoginIcon />","          </ListItemIcon>","          <ListItemText primary=\"Login\" />","        </ListItemButton>","      )}","    </Box>","  );","","  return (","    <>","      <IconButton","        edge=\"start\"","        color=\"inherit\"","        aria-label=\"menu\"","        onClick={toggleDrawer(true)}","      >","        <MenuIcon />","      </IconButton>","      <Drawer","        anchor=\"left\"","        open={open}","        onClose={toggleDrawer(false)}","      >","        {DrawerContent}","      </Drawer>","    </>","  );","};","","export default Sidebar;"],"id":1}],[{"start":{"row":0,"column":0},"end":{"row":167,"column":23},"action":"remove","lines":["// src/components/Sidebar.js","import React, { useState } from 'react';","import { Link, useLocation, useNavigate } from 'react-router-dom';","import { useAuth } from '../context/AuthContext';","import { useTheme } from '../context/ThemeContext';","import {","  Drawer,","  List,","  ListItem,","  ListItemButton,","  ListItemIcon,","  ListItemText,","  Box,","  IconButton,","  Typography,","  Collapse,","  Select,","  MenuItem,","  FormControl,","  InputLabel,","  Divider","} from '@mui/material';","import {","  Menu as MenuIcon,","  Home as HomeIcon,","  Event as EventIcon,","  AccountCircle as AccountIcon,","  Logout as LogoutIcon,","  Login as LoginIcon,","  Settings as SettingsIcon,","  Palette as PaletteIcon,","  ExpandLess,","  ExpandMore","} from '@mui/icons-material';","","const Sidebar = () => {","  const location = useLocation();","  const navigate = useNavigate();","  const { user, logout } = useAuth();","  const { themeMode, setTheme } = useTheme();","  const [open, setOpen] = useState(false);","  const [themeOpen, setThemeOpen] = useState(false);","","  const toggleDrawer = (isOpen) => (event) => {","    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {","      return;","    }","    setOpen(isOpen);","  };","","  const handleLogout = () => {","    logout();","    setOpen(false);","    navigate('/login');","  };","","  const handleThemeChange = (event) => {","    setTheme(event.target.value);","    event.stopPropagation();","  };","","  const menuItems = [","    { text: 'Home', icon: <HomeIcon />, path: '/' },","    { text: 'Events', icon: <EventIcon />, path: '/events' },","    ...(user ? [{ text: 'Account', icon: <AccountIcon />, path: '/account' }] : [])","  ];","","  const DrawerContent = (","    <Box sx={{ width: 280, height: '100%', display: 'flex', flexDirection: 'column' }}>","      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>","        <EventIcon />","        <Typography variant=\"h6\">Event Registration</Typography>","      </Box>","      ","      <Divider />","","      <List sx={{ flexGrow: 1 }}>","        {menuItems.map((item) => (","          <ListItem key={item.text} disablePadding>","            <ListItemButton","              component={Link}","              to={item.path}","              selected={location.pathname === item.path}","              onClick={() => setOpen(false)}","            >","              <ListItemIcon>{item.icon}</ListItemIcon>","              <ListItemText primary={item.text} />","            </ListItemButton>","          </ListItem>","        ))}","","        <ListItem disablePadding>","          <ListItemButton onClick={() => setThemeOpen(!themeOpen)}>","            <ListItemIcon>","              <PaletteIcon />","            </ListItemIcon>","            <ListItemText primary=\"Theme\" />","            {themeOpen ? <ExpandLess /> : <ExpandMore />}","          </ListItemButton>","        </ListItem>","        ","        <Collapse in={themeOpen} timeout=\"auto\" unmountOnExit>","          <List component=\"div\" disablePadding>","            <ListItem sx={{ pl: 4 }}>","              <FormControl fullWidth size=\"small\">","                <InputLabel>Theme Mode</InputLabel>","                <Select","                  value={themeMode}","                  label=\"Theme Mode\"","                  onChange={handleThemeChange}","                  onClick={(e) => e.stopPropagation()}","                >","                  <MenuItem value=\"light\">Light</MenuItem>","                  <MenuItem value=\"dark\">Dark</MenuItem>","                  <MenuItem value=\"system\">System</MenuItem>","                </Select>","              </FormControl>","            </ListItem>","          </List>","        </Collapse>","      </List>","","      <Divider />","      ","      {user ? (","        <ListItemButton onClick={handleLogout}>","          <ListItemIcon>","            <LogoutIcon />","          </ListItemIcon>","          <ListItemText primary=\"Logout\" />","        </ListItemButton>","      ) : (","        <ListItemButton","          component={Link}","          to=\"/login\"","          onClick={() => setOpen(false)}","        >","          <ListItemIcon>","            <LoginIcon />","          </ListItemIcon>","          <ListItemText primary=\"Login\" />","        </ListItemButton>","      )}","    </Box>","  );","","  return (","    <>","      <IconButton","        edge=\"start\"","        color=\"inherit\"","        aria-label=\"menu\"","        onClick={toggleDrawer(true)}","      >","        <MenuIcon />","      </IconButton>","      <Drawer","        anchor=\"left\"","        open={open}","        onClose={toggleDrawer(false)}","      >","        {DrawerContent}","      </Drawer>","    </>","  );","};","","export default Sidebar;"],"id":2},{"start":{"row":0,"column":0},"end":{"row":176,"column":23},"action":"insert","lines":["// src/components/Sidebar.js","import React, { useState } from 'react';","import { Link, useLocation, useNavigate } from 'react-router-dom';","import { useAuth } from '../context/AuthContext';","import { useTheme } from '../context/ThemeContext';","import {","  Drawer,","  List,","  ListItem,","  ListItemButton,","  ListItemIcon,","  ListItemText,","  Box,","  IconButton,","  Typography,","  Collapse,","  Button,","  Divider","} from '@mui/material';","import {","  Menu as MenuIcon,","  Home as HomeIcon,","  Event as EventIcon,","  AccountCircle as AccountIcon,","  Logout as LogoutIcon,","  Login as LoginIcon,","  Palette as PaletteIcon,","  LightMode as LightModeIcon,","  DarkMode as DarkModeIcon,","  ExpandLess,","  ExpandMore,","  Monitor as MonitorIcon","} from '@mui/icons-material';","","const Sidebar = () => {","  const location = useLocation();","  const navigate = useNavigate();","  const { user, logout } = useAuth();","  const { themeMode, setTheme } = useTheme();","  const [open, setOpen] = useState(false);","  const [themeOpen, setThemeOpen] = useState(false);","","  const toggleDrawer = (isOpen) => (event) => {","    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {","      return;","    }","    setOpen(isOpen);","  };","","  const handleLogout = () => {","    logout();","    setOpen(false);","    navigate('/login');","  };","","  const menuItems = [","    { text: 'Home', icon: <HomeIcon />, path: '/' },","    { text: 'Events', icon: <EventIcon />, path: '/events' },","    ...(user ? [{ text: 'Account', icon: <AccountIcon />, path: '/account' }] : [])","  ];","","  const DrawerContent = (","    <Box sx={{ ","      width: 280, ","      height: '100%', ","      display: 'flex', ","      flexDirection: 'column' ","    }}>","      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>","        <EventIcon />","        <Typography variant=\"h6\">Event Registration</Typography>","      </Box>","      ","      <Divider />","","      <List sx={{ flexGrow: 1 }}>","        {menuItems.map((item) => (","          <ListItem key={item.text} disablePadding>","            <ListItemButton","              component={Link}","              to={item.path}","              selected={location.pathname === item.path}","              onClick={() => setOpen(false)}","            >","              <ListItemIcon>{item.icon}</ListItemIcon>","              <ListItemText primary={item.text} />","            </ListItemButton>","          </ListItem>","        ))}","","        <ListItem disablePadding>","          <ListItemButton onClick={() => setThemeOpen(!themeOpen)}>","            <ListItemIcon>","              <PaletteIcon />","            </ListItemIcon>","            <ListItemText primary=\"Theme\" />","            {themeOpen ? <ExpandLess /> : <ExpandMore />}","          </ListItemButton>","        </ListItem>","        ","        <Collapse in={themeOpen} timeout=\"auto\" unmountOnExit>","          <List component=\"div\" disablePadding>","            <ListItem disablePadding>","              <ListItemButton ","                onClick={() => setTheme(themeMode === 'dark' ? 'light' : 'dark')}","                sx={{ pl: 4 }}","              >","                <ListItemIcon>","                  {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}","                </ListItemIcon>","                <ListItemText primary={`${themeMode === 'dark' ? 'Light' : 'Dark'} Mode`} />","              </ListItemButton>","            </ListItem>","            <ListItem disablePadding>","              <ListItemButton ","                onClick={() => setTheme('system')}","                selected={themeMode === 'system'}","                sx={{ pl: 4 }}","              >","                <ListItemIcon>","                  <MonitorIcon />","                </ListItemIcon>","                <ListItemText primary=\"Use System Theme\" />","              </ListItemButton>","            </ListItem>","          </List>","        </Collapse>","      </List>","","      <Divider />","      ","      <ListItem disablePadding>","        {user ? (","          <ListItemButton onClick={handleLogout}>","            <ListItemIcon>","              <LogoutIcon />","            </ListItemIcon>","            <ListItemText primary=\"Logout\" />","          </ListItemButton>","        ) : (","          <ListItemButton","            component={Link}","            to=\"/login\"","            onClick={() => setOpen(false)}","          >","            <ListItemIcon>","              <LoginIcon />","            </ListItemIcon>","            <ListItemText primary=\"Login\" />","          </ListItemButton>","        )}","      </ListItem>","    </Box>","  );","","  return (","    <>","      <IconButton","        edge=\"start\"","        color=\"inherit\"","        aria-label=\"menu\"","        onClick={toggleDrawer(true)}","      >","        <MenuIcon />","      </IconButton>","      <Drawer","        anchor=\"left\"","        open={open}","        onClose={toggleDrawer(false)}","      >","        {DrawerContent}","      </Drawer>","    </>","  );","};","","export default Sidebar;"]}],[{"start":{"row":63,"column":15},"end":{"row":63,"column":16},"action":"remove","lines":["0"],"id":3},{"start":{"row":63,"column":14},"end":{"row":63,"column":15},"action":"remove","lines":["8"]}],[{"start":{"row":63,"column":14},"end":{"row":63,"column":15},"action":"insert","lines":["0"],"id":4},{"start":{"row":63,"column":15},"end":{"row":63,"column":16},"action":"insert","lines":["0"]}],[{"start":{"row":63,"column":14},"end":{"row":63,"column":15},"action":"remove","lines":["0"],"id":5}],[{"start":{"row":63,"column":14},"end":{"row":63,"column":15},"action":"insert","lines":["5"],"id":6}],[{"start":{"row":34,"column":0},"end":{"row":40,"column":52},"action":"remove","lines":["const Sidebar = () => {","  const location = useLocation();","  const navigate = useNavigate();","  const { user, logout } = useAuth();","  const { themeMode, setTheme } = useTheme();","  const [open, setOpen] = useState(false);","  const [themeOpen, setThemeOpen] = useState(false);"],"id":7},{"start":{"row":34,"column":0},"end":{"row":40,"column":52},"action":"insert","lines":["const Sidebar = () => {","  const location = useLocation();","  const navigate = useNavigate();","  const { user, logout } = useAuth();","  const { themeMode, setTheme } = useTheme();","  const [open, setOpen] = useState(false);","  const [themeOpen, setThemeOpen] = useState(false);"]}],[{"start":{"row":40,"column":52},"end":{"row":41,"column":0},"action":"insert","lines":["",""],"id":10},{"start":{"row":41,"column":0},"end":{"row":41,"column":2},"action":"insert","lines":["  "]},{"start":{"row":41,"column":2},"end":{"row":42,"column":0},"action":"insert","lines":["",""]},{"start":{"row":42,"column":0},"end":{"row":42,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":42,"column":2},"end":{"row":54,"column":9},"action":"insert","lines":["// Reset dropdowns when sidebar closes","  useEffect(() => {","    if (!open) {","      setThemeOpen(false);","    }","  }, [open]);","","  // Set initial theme to system on component mount","  useEffect(() => {","    if (!themeMode) {","      setTheme('system');","    }","  }, []);"],"id":11}],[{"start":{"row":1,"column":24},"end":{"row":1,"column":25},"action":"insert","lines":[","],"id":12}],[{"start":{"row":1,"column":25},"end":{"row":1,"column":26},"action":"insert","lines":[" "],"id":13},{"start":{"row":1,"column":26},"end":{"row":1,"column":27},"action":"insert","lines":["u"]},{"start":{"row":1,"column":27},"end":{"row":1,"column":28},"action":"insert","lines":["s"]},{"start":{"row":1,"column":28},"end":{"row":1,"column":29},"action":"insert","lines":["e"]},{"start":{"row":1,"column":29},"end":{"row":1,"column":30},"action":"insert","lines":["E"]},{"start":{"row":1,"column":30},"end":{"row":1,"column":31},"action":"insert","lines":["f"]},{"start":{"row":1,"column":31},"end":{"row":1,"column":32},"action":"insert","lines":["f"]},{"start":{"row":1,"column":32},"end":{"row":1,"column":33},"action":"insert","lines":["e"]},{"start":{"row":1,"column":33},"end":{"row":1,"column":34},"action":"insert","lines":["c"]}],[{"start":{"row":1,"column":34},"end":{"row":1,"column":35},"action":"insert","lines":["t"],"id":14}],[{"start":{"row":56,"column":2},"end":{"row":61,"column":4},"action":"remove","lines":["const toggleDrawer = (isOpen) => (event) => {","    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {","      return;","    }","    setOpen(isOpen);","  };"],"id":15},{"start":{"row":56,"column":2},"end":{"row":61,"column":4},"action":"insert","lines":["const toggleDrawer = (isOpen) => (event) => {","    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {","      return;","    }","    setOpen(isOpen);","  };"]}],[{"start":{"row":169,"column":2},"end":{"row":187,"column":4},"action":"remove","lines":["return (","    <>","      <IconButton","        edge=\"start\"","        color=\"inherit\"","        aria-label=\"menu\"","        onClick={toggleDrawer(true)}","      >","        <MenuIcon />","      </IconButton>","      <Drawer","        anchor=\"left\"","        open={open}","        onClose={toggleDrawer(false)}","      >","        {DrawerContent}","      </Drawer>","    </>","  );"],"id":16},{"start":{"row":169,"column":2},"end":{"row":188,"column":4},"action":"insert","lines":["return (","    <>","      <IconButton","        edge=\"start\"","        color=\"inherit\"","        aria-label=\"menu\"","        onClick={toggleDrawer(true)}","        sx={{ ml: -1 }} // Removes the left margin","      >","        <MenuIcon />","      </IconButton>","      <Drawer","        anchor=\"left\"","        open={open}","        onClose={toggleDrawer(false)}","      >","        {DrawerContent}","      </Drawer>","    </>","  );"]}]]},"ace":{"folds":[],"scrolltop":2534.3999999999974,"scrollleft":0,"selection":{"start":{"row":188,"column":4},"end":{"row":188,"column":4},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1733282447903,"hash":"e4ca7ad538aff404f6a2c696646aa66c22b61659"}