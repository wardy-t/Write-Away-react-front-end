import { useState, createContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Landing from './components/Landing/Landing';
import Inbox from './components/Inbox/Inbox';
import Reply from './components/Reply/Reply';
import Drafts from './components/Drafts/Drafts';
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

        {/* Protected routes */}
        {user ? (
          <>
            <Route path="/inbox" element={<Inbox handleSignout={handleSignout} />} />
            <Route path="/reply" element={<Reply />} />
            <Route path="/drafts" element={<Drafts handleSignout={handleSignout} />} />
          </>
        ) : (
          // Redirect to signin if user is not authenticated
          <Route path="*" element={<Navigate to="/signin" />} />
        )}
      </Routes>
    </AuthedUserContext.Provider>
  );
};

export default App;
