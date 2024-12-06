{"filter":false,"title":"App.js","tooltip":"/event-registration/frontend/src/App.js","undoManager":{"mark":17,"position":17,"stack":[[{"start":{"row":5,"column":62},"end":{"row":6,"column":0},"action":"insert","lines":["",""],"id":2}],[{"start":{"row":6,"column":0},"end":{"row":6,"column":55},"action":"insert","lines":["import { ThemeProvider } from './context/ThemeContext';"],"id":3}],[{"start":{"row":0,"column":0},"end":{"row":64,"column":19},"action":"remove","lines":["// src/App.js","import React from 'react';","import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';","import { Provider } from 'react-redux';","import { store } from './store';","import { AuthProvider, useAuth } from './context/AuthContext';","import { ThemeProvider } from './context/ThemeContext';","import ProtectedRoute from './components/ProtectedRoute';","import AdminRoute from './components/AdminRoute';","import Header from './components/Header';","import HomePage from './pages/HomePage';","import EventsPage from './pages/EventsPage';","import EventDetailPage from './pages/EventDetailPage';","import CreateEventPage from './pages/CreateEventPage';","import LoginPage from './pages/LoginPage';","import RegisterPage from './pages/RegisterPage';","import AccountPage from './pages/AccountPage';","","const AppRoutes = () => {","  const { user, loading } = useAuth();","","  if (loading) {","    return <div>Loading...</div>;","  }","","  return (","    <div className=\"min-h-screen bg-gray-50\">","      <Header />","      <main>","        <Routes>","          <Route path=\"/login\" element={user ? <Navigate to=\"/\" /> : <LoginPage />} />","          <Route path=\"/register\" element={user ? <Navigate to=\"/\" /> : <RegisterPage />} />","          <Route path=\"/\" element={<HomePage />} />","          <Route path=\"/events\" element={<EventsPage />} />","          <Route ","            path=\"/events/create\" ","            element={","              <ProtectedRoute>","                <AdminRoute>","                  <CreateEventPage />","                </AdminRoute>","              </ProtectedRoute>","            } ","          />","          <Route path=\"/events/:urlName\" element={<EventDetailPage />} />","          <Route path=\"/account\" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />","        </Routes>","      </main>","    </div>","  );","};","","const App = () => {","  return (","    <Provider store={store}>","      <AuthProvider>","        <Router>","          <AppRoutes />","        </Router>","      </AuthProvider>","    </Provider>","  );","};","","export default App;"],"id":4},{"start":{"row":0,"column":0},"end":{"row":66,"column":19},"action":"insert","lines":["// src/App.js","import React from 'react';","import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';","import { Provider } from 'react-redux';","import { store } from './store';","import { AuthProvider, useAuth } from './context/AuthContext';","import { ThemeProvider } from './context/ThemeContext';","import { CssBaseline } from '@mui/material';","import ProtectedRoute from './components/ProtectedRoute';","import AdminRoute from './components/AdminRoute';","import Header from './components/Header';","import HomePage from './pages/HomePage';","import EventsPage from './pages/EventsPage';","import EventDetailPage from './pages/EventDetailPage';","import CreateEventPage from './pages/CreateEventPage';","import LoginPage from './pages/LoginPage';","import RegisterPage from './pages/RegisterPage';","import AccountPage from './pages/AccountPage';","","const AppRoutes = () => {","  const { user, loading } = useAuth();","  if (loading) {","    return <div>Loading...</div>;","  }","  return (","    <div className=\"min-h-screen\">","      <Header />","      <main>","        <Routes>","          <Route path=\"/login\" element={user ? <Navigate to=\"/\" /> : <LoginPage />} />","          <Route path=\"/register\" element={user ? <Navigate to=\"/\" /> : <RegisterPage />} />","          <Route path=\"/\" element={<HomePage />} />","          <Route path=\"/events\" element={<EventsPage />} />","          <Route ","            path=\"/events/create\" ","            element={","              <ProtectedRoute>","                <AdminRoute>","                  <CreateEventPage />","                </AdminRoute>","              </ProtectedRoute>","            } ","          />","          <Route path=\"/events/:urlName\" element={<EventDetailPage />} />","          <Route path=\"/account\" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />","        </Routes>","      </main>","    </div>","  );","};","","const App = () => {","  return (","    <Provider store={store}>","      <ThemeProvider>","        <AuthProvider>","          <CssBaseline />","          <Router>","            <AppRoutes />","          </Router>","        </AuthProvider>","      </ThemeProvider>","    </Provider>","  );","};","","export default App;"]}],[{"start":{"row":0,"column":0},"end":{"row":66,"column":19},"action":"remove","lines":["// src/App.js","import React from 'react';","import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';","import { Provider } from 'react-redux';","import { store } from './store';","import { AuthProvider, useAuth } from './context/AuthContext';","import { ThemeProvider } from './context/ThemeContext';","import { CssBaseline } from '@mui/material';","import ProtectedRoute from './components/ProtectedRoute';","import AdminRoute from './components/AdminRoute';","import Header from './components/Header';","import HomePage from './pages/HomePage';","import EventsPage from './pages/EventsPage';","import EventDetailPage from './pages/EventDetailPage';","import CreateEventPage from './pages/CreateEventPage';","import LoginPage from './pages/LoginPage';","import RegisterPage from './pages/RegisterPage';","import AccountPage from './pages/AccountPage';","","const AppRoutes = () => {","  const { user, loading } = useAuth();","  if (loading) {","    return <div>Loading...</div>;","  }","  return (","    <div className=\"min-h-screen\">","      <Header />","      <main>","        <Routes>","          <Route path=\"/login\" element={user ? <Navigate to=\"/\" /> : <LoginPage />} />","          <Route path=\"/register\" element={user ? <Navigate to=\"/\" /> : <RegisterPage />} />","          <Route path=\"/\" element={<HomePage />} />","          <Route path=\"/events\" element={<EventsPage />} />","          <Route ","            path=\"/events/create\" ","            element={","              <ProtectedRoute>","                <AdminRoute>","                  <CreateEventPage />","                </AdminRoute>","              </ProtectedRoute>","            } ","          />","          <Route path=\"/events/:urlName\" element={<EventDetailPage />} />","          <Route path=\"/account\" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />","        </Routes>","      </main>","    </div>","  );","};","","const App = () => {","  return (","    <Provider store={store}>","      <ThemeProvider>","        <AuthProvider>","          <CssBaseline />","          <Router>","            <AppRoutes />","          </Router>","        </AuthProvider>","      </ThemeProvider>","    </Provider>","  );","};","","export default App;"],"id":5},{"start":{"row":0,"column":0},"end":{"row":66,"column":19},"action":"insert","lines":["// src/App.js","import React from 'react';","import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';","import { Provider } from 'react-redux';","import { store } from './store';","import { AuthProvider, useAuth } from './context/AuthContext';","import { ThemeProvider } from './context/ThemeContext';","import { CssBaseline } from '@mui/material';","import ProtectedRoute from './components/ProtectedRoute';","import AdminRoute from './components/AdminRoute';","import Header from './components/Header';","import HomePage from './pages/HomePage';","import EventsPage from './pages/EventsPage';","import EventDetailPage from './pages/EventDetailPage';","import CreateEventPage from './pages/CreateEventPage';","import LoginPage from './pages/LoginPage';","import RegisterPage from './pages/RegisterPage';","import AccountPage from './pages/AccountPage';","","const AppRoutes = () => {","  const { user, loading } = useAuth();","  if (loading) {","    return <div>Loading...</div>;","  }","  return (","    <div className=\"min-h-screen\">","      <Header />","      <main>","        <Routes>","          <Route path=\"/login\" element={user ? <Navigate to=\"/\" /> : <LoginPage />} />","          <Route path=\"/register\" element={user ? <Navigate to=\"/\" /> : <RegisterPage />} />","          <Route path=\"/\" element={<HomePage />} />","          <Route path=\"/events\" element={<EventsPage />} />","          <Route ","            path=\"/events/create\" ","            element={","              <ProtectedRoute>","                <AdminRoute>","                  <CreateEventPage />","                </AdminRoute>","              </ProtectedRoute>","            } ","          />","          <Route path=\"/events/:urlName\" element={<EventDetailPage />} />","          <Route path=\"/account\" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />","        </Routes>","      </main>","    </div>","  );","};","","const App = () => {","  return (","    <Provider store={store}>","      <ThemeProvider>","        <AuthProvider>","          <CssBaseline />","          <Router>","            <AppRoutes />","          </Router>","        </AuthProvider>","      </ThemeProvider>","    </Provider>","  );","};","","export default App;"]}],[{"start":{"row":44,"column":94},"end":{"row":45,"column":0},"action":"insert","lines":["",""],"id":6},{"start":{"row":45,"column":0},"end":{"row":45,"column":10},"action":"insert","lines":["          "]}],[{"start":{"row":45,"column":10},"end":{"row":45,"column":63},"action":"insert","lines":["<Route path=\"/calendar\" element={<CalendarPage />} />"],"id":7}],[{"start":{"row":17,"column":46},"end":{"row":18,"column":0},"action":"insert","lines":["",""],"id":8}],[{"start":{"row":18,"column":0},"end":{"row":18,"column":48},"action":"insert","lines":["import CalendarPage from './pages/CalendarPage';"],"id":9}],[{"start":{"row":1,"column":0},"end":{"row":1,"column":26},"action":"remove","lines":["import React from 'react';"],"id":12},{"start":{"row":1,"column":0},"end":{"row":1,"column":34},"action":"insert","lines":["import { useEffect } from 'react';"]}],[{"start":{"row":24,"column":3},"end":{"row":25,"column":0},"action":"insert","lines":["",""],"id":13},{"start":{"row":25,"column":0},"end":{"row":25,"column":2},"action":"insert","lines":["  "]},{"start":{"row":25,"column":2},"end":{"row":26,"column":0},"action":"insert","lines":["",""]},{"start":{"row":26,"column":0},"end":{"row":26,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":26,"column":2},"end":{"row":28,"column":7},"action":"insert","lines":["useEffect(() => {","  document.title = 'EventFlow';","}, []);"],"id":14}],[{"start":{"row":28,"column":7},"end":{"row":29,"column":0},"action":"insert","lines":["",""],"id":15}],[{"start":{"row":27,"column":0},"end":{"row":27,"column":2},"action":"insert","lines":["  "],"id":16},{"start":{"row":28,"column":0},"end":{"row":28,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":25,"column":2},"end":{"row":28,"column":9},"action":"remove","lines":["","  useEffect(() => {","    document.title = 'EventFlow';","  }, []);"],"id":17}],[{"start":{"row":25,"column":0},"end":{"row":25,"column":2},"action":"remove","lines":["  "],"id":18},{"start":{"row":24,"column":3},"end":{"row":25,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":24,"column":3},"end":{"row":25,"column":0},"action":"remove","lines":["",""],"id":19}],[{"start":{"row":53,"column":19},"end":{"row":54,"column":0},"action":"insert","lines":["",""],"id":20},{"start":{"row":54,"column":0},"end":{"row":54,"column":2},"action":"insert","lines":["  "]},{"start":{"row":54,"column":2},"end":{"row":55,"column":0},"action":"insert","lines":["",""]},{"start":{"row":55,"column":0},"end":{"row":55,"column":2},"action":"insert","lines":["  "]}],[{"start":{"row":54,"column":2},"end":{"row":57,"column":9},"action":"insert","lines":["","  useEffect(() => {","    document.title = 'EventFlow';","  }, []);"],"id":21}]]},"ace":{"folds":[],"scrolltop":838.1999999999999,"scrollleft":0,"selection":{"start":{"row":57,"column":9},"end":{"row":57,"column":9},"isBackwards":true},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1733475156585,"hash":"622b0f31e5a1aaa3a798b8598302ea31075e77b7"}