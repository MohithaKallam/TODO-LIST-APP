import React from 'react';
import { Link } from 'react-router-dom';  
import '../styles/LandingPage.css';
import { FaItalic } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="overlay">

        {/* Navigation Bar */}
        <nav className="nav-bar">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            
          </ul>
        </nav>

        <div className="content">
          <h1>TASK MATE</h1>

          <h3><i>Transform your ideas into action. Simplify your tasks, prioritize what matters, and build momentum that lasts.</i></h3><br></br><br></br>
         <Link to="/home" className="cta-button">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
