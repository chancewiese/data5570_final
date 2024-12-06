{"filter":false,"title":"App.js","tooltip":"/event-registration/frontend/src/App.js","undoManager":{"mark":7,"position":7,"stack":[[{"start":{"row":5,"column":62},"end":{"row":6,"column":0},"action":"insert","lines":["",""],"id":2}],[{"start":{"row":6,"column":0},"end":{"row":6,"column":55},"action":"insert","lines":["import { ThemeProvider } from './context/ThemeContext';"],"id":3}],[{"start":{"row":0,"column":0},"end":{"row":64,"column":19},"action":"remove","lines":["// src/App.js","import React from 'react';","import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';","import { Provider } from 'react-redux';","import { store } from './store';","import { AuthProvider, useAuth } from './context/AuthContext';","import { ThemeProvider } from './context/ThemeContext';","import ProtectedRoute from './components/ProtectedRoute';","import AdminRoute from './components/AdminRoute';","import Header from './components/Header';","import HomePage from './pages/HomePage';","import EventsPage from './pages/EventsPage';","import EventDetailPage from './pages/EventDetailPage';","import CreateEventPage from './pages/CreateEventPage';","import LoginPage from './pages/LoginPage';","import RegisterPage from './pages/RegisterPage';","import AccountPage from './pages/AccountPage';","","const AppRoutes = () => {","  const { user, loading } = useAuth();","","  if (loading) {","    return <div>Loading...</div>;","  }","","  return (","    <div className=\"min-h-screen bg-gray-50\">","      <Header />","      <main>","        <Routes>","          <Route path=\"/login\" element={user ? <Navigate to=\"/\" /> : <LoginPage />} />","          <Route path=\"/register\" element={user ? <Navigate to=\"/\" /> : <RegisterPage />} />","          <Route path=\"/\" element={<HomePage />} />","          <Route path=\"/events\" element={<EventsPage />} />","          <Route ","            path=\"/events/create\" ","            element={","              <ProtectedRoute>","                <AdminRoute>","                  <CreateEventPage />","                </AdminRoute>","              </ProtectedRoute>","            } ","          />","          <Route path=\"/events/:urlName\" element={<EventDetailPage />} />","          <Route path=\"/account\" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />","        </Routes>","      </main>","    </div>","  );","};","","const App = () => {","  return (","    <Provider store={store}>","      <AuthProvider>","        <Router>","          <AppRoutes />","        </Router>","      </AuthProvider>","    </Provider>","  );","};","","export default App;"],"id":4},{"start":{"row":0,"column":0},"end":{"row":66,"column":19},"action":"insert","lines":["// src/App.js","import React from 'react';","import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';","import { Provider } from 'react-redux';","import { store } from './store';","import { AuthProvider, useAuth } from './context/AuthContext';","import { ThemeProvider } from './context/ThemeContext';","import { CssBaseline } from '@mui/material';","import ProtectedRoute from './components/ProtectedRoute';","import AdminRoute from './components/AdminRoute';","import Header from './components/Header';","import HomePage from './pages/HomePage';","import EventsPage from './pages/EventsPage';","import EventDetailPage from './pages/EventDetailPage';","import CreateEventPage from './pages/CreateEventPage';","import LoginPage from './pages/LoginPage';","import RegisterPage from './pages/RegisterPage';","import AccountPage from './pages/AccountPage';","","const AppRoutes = () => {","  const { user, loading } = useAuth();","  if (loading) {","    return <div>Loading...</div>;","  }","  return (","    <div className=\"min-h-screen\">","      <Header />","      <main>","        <Routes>","          <Route path=\"/login\" element={user ? <Navigate to=\"/\" /> : <LoginPage />} />","          <Route path=\"/register\" element={user ? <Navigate to=\"/\" /> : <RegisterPage />} />","          <Route path=\"/\" element={<HomePage />} />","          <Route path=\"/events\" element={<EventsPage />} />","          <Route ","            path=\"/events/create\" ","            element={","              <ProtectedRoute>","                <AdminRoute>","                  <CreateEventPage />","                </AdminRoute>","              </ProtectedRoute>","            } ","          />","          <Route path=\"/events/:urlName\" element={<EventDetailPage />} />","          <Route path=\"/account\" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />","        </Routes>","      </main>","    </div>","  );","};","","const App = () => {","  return (","    <Provider store={store}>","      <ThemeProvider>","        <AuthProvider>","          <CssBaseline />","          <Router>","            <AppRoutes />","          </Router>","        </AuthProvider>","      </ThemeProvider>","    </Provider>","  );","};","","export default App;"]}],[{"start":{"row":0,"column":0},"end":{"row":66,"column":19},"action":"remove","lines":["// src/App.js","import React from 'react';","import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';","import { Provider } from 'react-redux';","import { store } from './store';","import { AuthProvider, useAuth } from './context/AuthContext';","import { ThemeProvider } from './context/ThemeContext';","import { CssBaseline } from '@mui/material';","import ProtectedRoute from './components/ProtectedRoute';","import AdminRoute from './components/AdminRoute';","import Header from './components/Header';","import HomePage from './pages/HomePage';","import EventsPage from './pages/EventsPage';","import EventDetailPage from './pages/EventDetailPage';","import CreateEventPage from './pages/CreateEventPage';","import LoginPage from './pages/LoginPage';","import RegisterPage from './pages/RegisterPage';","import AccountPage from './pages/AccountPage';","","const AppRoutes = () => {","  const { user, loading } = useAuth();","  if (loading) {","    return <div>Loading...</div>;","  }","  return (","    <div className=\"min-h-screen\">","      <Header />","      <main>","        <Routes>","          <Route path=\"/login\" element={user ? <Navigate to=\"/\" /> : <LoginPage />} />","          <Route path=\"/register\" element={user ? <Navigate to=\"/\" /> : <RegisterPage />} />","          <Route path=\"/\" element={<HomePage />} />","          <Route path=\"/events\" element={<EventsPage />} />","          <Route ","            path=\"/events/create\" ","            element={","              <ProtectedRoute>","                <AdminRoute>","                  <CreateEventPage />","                </AdminRoute>","              </ProtectedRoute>","            } ","          />","          <Route path=\"/events/:urlName\" element={<EventDetailPage />} />","          <Route path=\"/account\" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />","        </Routes>","      </main>","    </div>","  );","};","","const App = () => {","  return (","    <Provider store={store}>","      <ThemeProvider>","        <AuthProvider>","          <CssBaseline />","          <Router>","            <AppRoutes />","          </Router>","        </AuthProvider>","      </ThemeProvider>","    </Provider>","  );","};","","export default App;"],"id":5},{"start":{"row":0,"column":0},"end":{"row":66,"column":19},"action":"insert","lines":["// src/App.js","import React from 'react';","import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';","import { Provider } from 'react-redux';","import { store } from './store';","import { AuthProvider, useAuth } from './context/AuthContext';","import { ThemeProvider } from './context/ThemeContext';","import { CssBaseline } from '@mui/material';","import ProtectedRoute from './components/ProtectedRoute';","import AdminRoute from './components/AdminRoute';","import Header from './components/Header';","import HomePage from './pages/HomePage';","import EventsPage from './pages/EventsPage';","import EventDetailPage from './pages/EventDetailPage';","import CreateEventPage from './pages/CreateEventPage';","import LoginPage from './pages/LoginPage';","import RegisterPage from './pages/RegisterPage';","import AccountPage from './pages/AccountPage';","","const AppRoutes = () => {","  const { user, loading } = useAuth();","  if (loading) {","    return <div>Loading...</div>;","  }","  return (","    <div className=\"min-h-screen\">","      <Header />","      <main>","        <Routes>","          <Route path=\"/login\" element={user ? <Navigate to=\"/\" /> : <LoginPage />} />","          <Route path=\"/register\" element={user ? <Navigate to=\"/\" /> : <RegisterPage />} />","          <Route path=\"/\" element={<HomePage />} />","          <Route path=\"/events\" element={<EventsPage />} />","          <Route ","            path=\"/events/create\" ","            element={","              <ProtectedRoute>","                <AdminRoute>","                  <CreateEventPage />","                </AdminRoute>","              </ProtectedRoute>","            } ","          />","          <Route path=\"/events/:urlName\" element={<EventDetailPage />} />","          <Route path=\"/account\" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />","        </Routes>","      </main>","    </div>","  );","};","","const App = () => {","  return (","    <Provider store={store}>","      <ThemeProvider>","        <AuthProvider>","          <CssBaseline />","          <Router>","            <AppRoutes />","          </Router>","        </AuthProvider>","      </ThemeProvider>","    </Provider>","  );","};","","export default App;"]}],[{"start":{"row":44,"column":94},"end":{"row":45,"column":0},"action":"insert","lines":["",""],"id":6},{"start":{"row":45,"column":0},"end":{"row":45,"column":10},"action":"insert","lines":["          "]}],[{"start":{"row":45,"column":10},"end":{"row":45,"column":63},"action":"insert","lines":["<Route path=\"/calendar\" element={<CalendarPage />} />"],"id":7}],[{"start":{"row":17,"column":46},"end":{"row":18,"column":0},"action":"insert","lines":["",""],"id":8}],[{"start":{"row":18,"column":0},"end":{"row":18,"column":48},"action":"insert","lines":["import CalendarPage from './pages/CalendarPage';"],"id":9}]]},"ace":{"folds":[],"scrolltop":817.1999999999999,"scrollleft":0,"selection":{"start":{"row":63,"column":14},"end":{"row":63,"column":14},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":115,"mode":"ace/mode/javascript"}},"timestamp":1733286186669,"hash":"2a6b7ba3ec25c7b67790e04345b342092d07d243"}