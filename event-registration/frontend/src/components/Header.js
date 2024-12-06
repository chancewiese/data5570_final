// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Sidebar from './Sidebar';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ pl: 2 }}>
        <Sidebar />
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ 
            flexGrow: 1, 
            marginLeft: 2,
            textDecoration: 'none', 
            color: 'inherit' 
          }}
        >
          EventFlow
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;