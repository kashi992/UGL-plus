import React, { useState, useEffect, useRef } from 'react'
import HeroSlider from './heroSlider'
import LoginForm from '../login-page/index'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/');
  };

  return (
    <>
      {!isAuthenticated ? (
        <LoginForm onLogin={handleLogin} />
      ) : (

        <HeroSlider />
      )}
    </>
  )
}

export default HomePage