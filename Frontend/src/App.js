import React, { useState, useEffect } from 'react';
import './index.css';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Dashboard from './Pages/Dashboard';
import TaskList from './Pages/TaskList';
import Register from './Authentication/Registration';
import Login from './Authentication/Login';
import { auth } from './firebase'; // Import Firebase auth for authentication state

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setIsLoggedIn(true);
        setUser(authUser);
        // Navigate to dashboard if the user is logged in and not on the dashboard
        if (window.location.pathname === '/login' || window.location.pathname === '/register') {
          navigate('/dashboard');
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
        // Navigate to login if the user is not logged in and not on the login or register page
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
          navigate('/login');
        }
      }
      setLoading(false); // Set loading to false after auth state is determined
    });

    return () => unsubscribe();
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      setIsLoggedIn(false);
      setUser(null);
      navigate('/login');
    });
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  return (
    <div className="flex bg-gray-100">
      <Sidebar
        isOpen={sidebarOpen}
        onToggleSidebar={toggleSidebar}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      <div className={`p-4 w-full transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'ml-0'}`}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />

          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={isLoggedIn ? <Dashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/task-list" 
            element={isLoggedIn ? <TaskList /> : <Navigate to="/login" />} 
          />

          {/* Redirect to dashboard if logged in, else redirect to login */}
          <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
