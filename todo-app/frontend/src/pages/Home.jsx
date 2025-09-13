import React, { useEffect } from 'react';
import '../styles/HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  useEffect(() => {
    // Add "home" class to body when component mounts
    document.body.classList.add('home');

    // Cleanup: remove class when component unmounts
    return () => {
      document.body.classList.remove('home');
    };
  }, []);

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="logo"><i> TASKMATE</i> </div>
      </header>

      <div className="auth-links">
        <Link to="/signin" className="auth-link signin">Sign In</Link>
        <Link to="/signup" className="auth-link signup">Sign Up</Link>
      </div>

      <main className="homepage-main">
        <h1>Welcome to TaskMate</h1>
        <p className="intro-text">
          TaskMate is your personal productivity assistant. Organize your day, manage tasks, and get more done with a clean, simple interface.
        </p>

        <section className="features-section">
          <h2>What You Can Do</h2>
          <ul className="features-list">
            <li>✅ Create, edit, and delete tasks with ease</li>
            <li>📅 Organize tasks by categories, priority, and due dates</li>
            <li>🔔 Get smart reminders and notifications</li>
            <li>📈 Track your productivity and task completion</li>
          </ul>
        </section>

        <section className="cta-section">
          <h3>Get Started Now!</h3>
          <p>Create your free account and take control of your day.</p>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
