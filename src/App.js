import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Dashboard from './Pages/Dashboard';
import TaskList from './Pages/TaskList'
import './index.css';
import Register from './Authentication/Registration';
import Login from './Authentication/Login';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
      <div className={`p-4 w-full transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'ml-0'}`}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
