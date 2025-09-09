import React, { useState, useEffect } from 'react';
import Splash1 from '../../../public/images/Splash1.png';
import './SplashScreen.css';
import { Link } from 'react-router-dom';

const quotes = [
  {
    title: "Search for a lawyer",
    description: "Search for a lawyer, know more about their work experience and area of practice."
  },
  {
    title: "Schedule a meeting",
    description: "Find the right time and schedule an appointment easily with your chosen lawyer."
  },
  {
    title: "Track case progress",
    description: "Stay informed by tracking the progress of your legal case in real-time."
  }
];

const Interval = 5000;

const SplashScreen = () => {
  const [quotesIndex, setQuotesIndex] = useState(0);

  // auto-advance quotes
  useEffect(() => {
    if (quotesIndex < quotes.length - 1) {
      const timer = setTimeout(() => setQuotesIndex(quotesIndex + 1), Interval);
      return () => clearTimeout(timer);
    }
  }, [quotesIndex]);

  const handleNext = () => {
    if (quotesIndex < quotes.length - 1) {
      setQuotesIndex(quotesIndex + 1);
    }
  };

  const handleSkip = () => {
    setQuotesIndex(quotes.length - 1);
  };

  const isLastSlide = quotesIndex === quotes.length - 1;

  return (
    <div className='landing-page-body'>
      {/* Logo + brand name above card */}
      <div className="splash-header">
        <img src="/images/logo1.png" alt="Juristiq logo" />
        <p>JURISTIQ</p>
      </div>

      <div className="onboarding-container">
        <div className="image-container">
          <img src={Splash1} alt="Illustration" className="illustration" />
        </div>

        <div className="pagination-dots">
          {quotes.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === quotesIndex ? 'active' : ''}`}
            />
          ))}
        </div>

        <h2>{quotes[quotesIndex].title}</h2>
        <p className='quotes'>{quotes[quotesIndex].description}</p>

        {quotesIndex < quotes.length - 1 ? (
          <button className="next-button" onClick={handleNext}>Next</button>
        ) : (
          <div className="auth-buttons">
            <Link to="/register"><button className="auth-btn signup-btn">Sign Up</button></Link>
            <Link to="/login"><button className="auth-btn signin-btn">Sign In</button></Link>
          </div>
        )}

        <button className="skip-link" onClick={handleSkip}>Skip</button>
      </div>
    </div>  
  );
};

export default SplashScreen;
