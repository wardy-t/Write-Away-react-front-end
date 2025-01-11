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
      sender: "Rachel@Teacher.Write-Away",
      subject: "Reminder: Submit Your Homework by Tomorrow!",
      body: "Hello students, just a quick reminder to submit your homework by tomorrow at 5 PM. Please let me know if you have any questions or need assistance. Have a great day!"
    }
    ,
    {
      id: 2,
      sender: "Rachel@Teacher.Write-Away",
      subject: "Important: Upcoming Parent-Teacher Conference",
      body: "Dear students and parents, we will be holding a parent-teacher conference next Thursday at 6 PM in the school auditorium. Please RSVP by this Friday. Looking forward to seeing you there!"
    },
    {
      id: 3,
      sender: "Rachel@Teacher.Write-Away",
      subject: "Great Job on the Science Fair!",
      body: "Hi everyone, I just wanted to say how proud I am of all your hard work on the science fair projects. The creativity and effort you showed were amazing. Keep up the excellent work!"
    },
    {
      id: 4,
      sender: "Rachel@Teacher.Write-Away",
      subject: "Weekly Assignment Update",
      body: "Hello students, this week's assignments are now posted on the class portal. Please review the instructions carefully and complete them by the deadline. Reach out if you have questions!"
    },
    {
      id: 5,
      sender: "Rachel@Teacher.Write-Away",
      subject: "Class Field Trip Details",
      body: "Dear students and parents, our class field trip to the art museum is scheduled for next Wednesday. Please arrive at the school by 8 AM. Don't forget to bring your permission slips and a packed lunch!"
    }
    
    
    
  ]);

  const [replies, setReplies] = useState([
    {
      id: "1",
      sender: "Stephen@student.write-away",
      subject: "Re: Reminder: Submit Your Homework by Tomorrow!",
      body: "Hi Rachel, thanks for the reminder! I'll make sure to submit my homework by the deadline. Let me know if there's anything specific I should focus on.",
      currentFolder: "sent"
    },
    {
      id: "2",
      sender: "Stephen@student.write-away",
      subject: "Re: Important: Upcoming Parent-Teacher Conference",
      body: "Hi Rachel, thanks for the update. I'll let my parents know about the conference. We'll RSVP by the end of the week.",
      currentFolder: "sent"
    },
    {
      id: "3",
      sender: "Stephen@student.write-away",
      subject: "Re: Great Job on the Science Fair!",
      body: "Hi Rachel, thank you for the kind words! I really enjoyed working on my project and seeing everyone else's creativity. It was a great experience!",
      currentFolder: "sent"
    },
    {
      id: "4",
      sender: "Stephen@student.write-away",
      subject: "Re: Weekly Assignment Update",
      body: "Hi Rachel, thanks for the update! I'll check the class portal and reach out if I have any questions about the assignments.",
      currentFolder: "sent"
    },
    {
      id: "5",
      sender: "Stephen@student.write-away",
      subject: "Re: Class Field Trip Details",
      body: "Hi Rachel, I'm excited for the field trip! I'll make sure to bring my permission slip and lunch as instructed. Thanks for organizing this!",
      currentFolder: "sent"
    },
    {
      id: "1",
      sender: "Stephen@student.write-away",
      subject: "Re: Reminder: Submit Your Homework by Tomorrow!",
      body: "Hi Rachel, thanks for the reminder! I'll make sure to...",
      currentFolder: "drafts"
    },
    {
      id: "2",
      sender: "Stephen@student.write-away",
      subject: "Re: Important: Upcoming Parent-Teacher Conference",
      body: "Hi Rachel, thanks for the update. I'll let my parents know about...",
      currentFolder: "drafts"
    },
    {
      id: "3",
      sender: "Stephen@student.write-away",
      subject: "Re: Great Job on the Science Fair!",
      body: "Hi Rachel, thank you for the kind words! I really enjoyed working on my project and...",
      currentFolder: "drafts"
    },
    {
      id: "4",
      sender: "Stephen@student.write-away",
      subject: "Re: Weekly Assignment Update",
      body: "Hi Rachel, thanks for the update! I'll check the class portal and...",
      currentFolder: "drafts"
    },
    {
      id: "5",
      sender: "Stephen@student.write-away",
      subject: "Re: Class Field Trip Details",
      body: "Hi Rachel, I'm excited for the field trip! I'll make sure to...",
      currentFolder: "drafts"
    }
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
              {user.role === 'admin' ? (
                <Route path="/" element={<SignupForm setUser={setUser} />} />
              ) : (
                <>
                  {/* Route for Inbox */}
                  <Route
                    path="/"
                    element={<EmailContainer user={user} emails={emails} />}
                  />
                  <Route
                    path="/drafts"
                    element={<ReplyContainer
                      user={user}
                      replies={replies}
                      myJob={'drafts'}
                    />}
                  />
                  <Route
                    path="/sent"
                    element={<ReplyContainer
                      user={user}
                      replies={replies}
                      myJob={'sent'}
                    />}
                  />
                  {/* Route for Email */}
                  <Route path="/email" element={<Email />} />
                  <Route path="/reply" element={<Reply />} />
                </>
              )}
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
