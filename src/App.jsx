import { useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import EmailContainer from './components/EmailContainer/EmailContainer';
import ReplyContainer from './components/ReplyContainer/ReplyContainer';
import Email from './components/Email/Email'; // Import the Email component
import Reply from './components/Reply/Reply';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; // import the authservice


export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice

    // Mock email data
    const [emails, setEmails] = useState([
      {
        id: 1,
        sender: 'teacher@example.com',
        subject: 'Assignment Reminder',
        body: 'Don’t forget to submit your assignment by Friday!',
        isReplied: false,
      },
      {
        id: 2,
        sender: 'admin@example.com',
        subject: 'Welcome to the Portal',
        body: 'We are excited to have you onboard!',
      },
    ]);

    const [replies, setReplies] = useState([
      {
        id: '678021864731a41677677756',
        sender: 'Alex@teacher.write-away',
        subject: '#3 This is another subject line',
        body: '#3 This is a reply body',
        currentFolder: 'sent'
      },
      {
      id: '67801ced0288437cd4826e8c',
      sender: 'stephen@teacher.write-away',
      subject: 'Welcome to the Portal',
      body: 'We are excited to have you onboard!',
      currentFolder: 'drafts'
      },
      ]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>

              {/* Route for Inbox */}
              <Route path="/" element={<EmailContainer user={user} emails={emails}/>} />
              <Route path="/drafts" element={<ReplyContainer user={user} replies={replies} myJob={'drafts'}/>} />
              <Route path="/sent" element={<ReplyContainer user={user} replies={replies} myJob={'sent'}/>} />
              {/* Route for Email */}
              <Route path="/email" element={<Email />} />
              <Route path="/reply" element={<Reply />} />
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;