import React, { useEffect, useState } from 'react';
import { Link ,Router,Route,Routes,BrowserRouter } from 'react-router-dom';
// import '.../styles/Header.css';
import '../styles/Header.css'
import logo from '../styles/logo.png';
import axios from 'axios';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import AuthForm from '../AuthForm';
import Home from './Home';
import SingleService from '../SingleService'
import UserProfile from '../User/UserProfile';

const apiKey = 'ba10be85226b1bd0dc34c4ebdbfa3ce4'; // Replace with your OpenWeatherMap API key

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [dayAbbreviation, setDayAbbreviation] = useState('');
  const [date, setDate] = useState('');
  const [cityName, setCityName] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // Check if user_id session exists
    const userId = sessionStorage.getItem('user_id');
    setIsLoggedIn(!!userId); // Update login status based on session existence

    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
        );
        const { main, name, weather } = response.data;
        setTemperature(main.temp);
        setCityName(name);
        setWeatherCondition(weather[0].main);
      } catch (error) {
        console.error('Failed to fetch temperature:', error);
      }
    };

    const handleGeolocationSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherData(latitude, longitude);
    };

    const handleGeolocationError = (error) => {
      console.error('Geolocation error:', error);
    };

    // Get user's location and fetch the temperature
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleGeolocationSuccess,
        handleGeolocationError
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }

    // Get current day and date
    const today = new Date();
    const options = {  weekday: 'short',month: 'short', day: 'numeric' };
    const day = today.toLocaleDateString('en-US', options);
    // const formattedDate = today.toLocaleDateString('en-US', { year: 'numeric' });
    setDayAbbreviation(day);
    // setDate(formattedDate);
  }, []); // Empty dependency array to run the effect only once on mount

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <WiDaySunny />;
      case 'Clouds':
        return <WiCloudy />;
      case 'Rain':
        return <WiRain />;
      case 'Snow':
        return <WiSnow />;
      case 'Thunderstorm':
        return <WiThunderstorm />;
      default:
        return null;
    }
  };
  const logout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("user_name");


    window.location.href = '/'; // Or redirect the user to login screen
  };
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
          {/* <Router> */}

      <div>
        <nav className='mynav'>
          <div className="logo">
            <img src={logo} alt="Logo Image" />
          </div>
          <div className={`hamburger ${menuOpen ? 'toggle' : ''}`} onClick={handleMenuClick}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li>
              <Link to="/" className="navA">
                Home
              </Link>
            </li>
            <li>
              <Link to="#services" className="navA">
                Services
              </Link>
            </li>
            {isLoggedIn ? ( // Check if user is logged in
              <>
                <li>
                  <Link to="/profile" className="navA">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/" className="logout-button" onClick={logout}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
            <li>
              <Link to="/signin" className="login-button">
                Login
              </Link>
            </li>
            </>
            )}
            {/* <li>
              <Link to="/signin"  className="join-button">
                Login
              </Link>
            </li> */}
            <li>{cityName}</li>
            <li>{`${dayAbbreviation} ${date}`}</li>
            <li className='temp-icon'>
              <i className="weather-icon">{getWeatherIcon(weatherCondition)}</i>
              <i>{temperature ? `${temperature}°C` : 'Fetching temperature...'}</i>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/signin" element={<AuthForm />} />  
          <Route path="/" element={<Home />} />   
          <Route path="/details/${service.id}" element={<SingleService />} /> 
          <Route path="/profile" element={<UserProfile />} />   
  
        
        </Routes>
      </div>
      {/* </Router> */}
      </BrowserRouter>

  );
};

export default Header;
