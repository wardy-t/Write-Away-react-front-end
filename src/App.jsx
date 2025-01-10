import { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import Landing from './components/Landing/Landing';
import Inbox from './components/Inbox/Inbox';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; // Import the auth service

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // Initialize user state

  console.log('Initial user from authService:', user); // Debugging log

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <AuthedUserContext.Provider value={user}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />

        {/* Protected route for Inbox */}
        {user && <Route path="/inbox" element={<Inbox handleSignout={handleSignout} />} />}

        {/* Fallback route */}
        {!user && <Route path="/inbox" element={<SigninForm setUser={setUser} />} />}
      </Routes>
    </AuthedUserContext.Provider>
  );
};

export default App;
