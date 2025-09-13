import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import Dashboard from './pages/Dashboard.jsx';
import './styles/App.css';




function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Landing page at root ("/") */}
          <Route path="/" element={<LandingPage />} />

          {/* Home page */}
          <Route path="/home" element={<Home />} />

          {/* SignUp page */}
          <Route path="/signup" element={<SignUp />} />

          {/* SignIn page */}
          <Route path="/signin" element={<SignIn />} />
           
           {/*Dashboard Page*/}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
