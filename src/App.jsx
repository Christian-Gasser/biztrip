import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUser, requestPublisher } from "./services/authService";
import "./App.css";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Trips from "./pages/Trips";
import Trip from "./pages/Trip";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Management from "./pages/Management";
import ManageTrip from "./pages/ManageTrip";
import NotFound from "./pages/NotFound";


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isPublisher, setIsPublisher] = useState(false)

  async function handleMount() {
    const token = localStorage.getItem('token')
    if (token !== null) {
      const user = await getUser()
      if (!user) {
        logout()
        return
      }
      setIsLoggedIn(true)
      setIsPublisher(user.isPublisher)
    }
  }

  useEffect(() => {
    handleMount()
  }, [])

  async function login() {
    setIsLoggedIn(true)
    const user = await getUser()
    setIsPublisher(user.isPublisher)
  }

  function logout() {
    setIsLoggedIn(false)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }

  async function handleRequestPublisher() {
    /* await requestPublisher()
    setIsPublisher(true) */
  }

  return (
    <>
      <div className="app">
        <Header onLogout={logout} onRequestPublisher={handleRequestPublisher} isLoggedIn={isLoggedIn} isPublisher={isPublisher} />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/trips" replace />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/trips" replace /> : <Login onLogin={login} />} />
            <Route path="/register" element={isLoggedIn ? <Navigate to="/trips" replace /> : <Register onLogin={login} />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/trips/:tripId" element={<Trip isLoggedIn={isLoggedIn} />} />
            <Route path="/bookings" element={<Bookings isLoggedIn={isLoggedIn}/>} />
            <Route path="/bookings/:bookingId" element={<Booking isLoggedIn={isLoggedIn} />} />
            <Route path="/management" element={<Management isPublisher={isPublisher} isLoggedIn={isLoggedIn}/>} />
            <Route path="/management/:tripId" element={<ManageTrip isPublisher={isPublisher} isLoggedIn={isLoggedIn} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
