import React from "react";
// import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import LandingPage from "./components/landing/landingpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
// import UserProfile from './components/User/UserProfile';
// import AuthForm from './components/AuthForm';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/Admin" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    <LandingPage />
    </>
    // <div>
    // <LandingPage />
    // </div>
  );
}

export default App;
