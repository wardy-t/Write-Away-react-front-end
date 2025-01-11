import { useState, useEffect, createContext } from 'react';
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
import * as emailService from '../src/services/emailService';
import * as replyService from '../src/services/replyService';
import Edit from './components/Edit/Edit'

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice

  // Mock email data
  const [emails, setEmails] = useState([
    {
      id: 1,
      emailFrom: "Rachel@Teacher.Write-Away",
      emailSubject: "Reminder: Submit Your Homework by Tomorrow!",
      emailBody: "Hello students, just a quick reminder to submit your homework by tomorrow at 5 PM. Please let me know if you have any questions or need assistance. Have a great day!"
    }
    ,
    {
      id: 2,
      emailFrom: "Rachel@Teacher.Write-Away",
      emailSubject: "Important: Upcoming Parent-Teacher Conference",
      emailBody: "Dear students and parents, we will be holding a parent-teacher conference next Thursday at 6 PM in the school auditorium. Please RSVP by this Friday. Looking forward to seeing you there!"
    },
    {
      id: 3,
      emailFrom: "Rachel@Teacher.Write-Away",
      emailSubject: "Great Job on the Science Fair!",
      emailBody: "Hi everyone, I just wanted to say how proud I am of all your hard work on the science fair projects. The creativity and effort you showed were amazing. Keep up the excellent work!"
    },
    {
      id: 4,
      emailFrom: "Rachel@Teacher.Write-Away",
      emailSubject: "Weekly Assignment Update",
      emailBody: "Hello students, this week's assignments are now posted on the class portal. Please review the instructions carefully and complete them by the deadline. Reach out if you have questions!"
    },
    {
      id: 5,
      emailFrom: "Rachel@Teacher.Write-Away",
      emailSubject: "Class Field Trip Details",
      emailBody: "Dear students and parents, our class field trip to the art museum is scheduled for next Wednesday. Please arrive at the school by 8 AM. Don't forget to bring your permission slips and a packed lunch!"
    }
    
    
    
  ]);

  const [replies, setReplies] = useState([
    {
      id: "1d",
      author: "Stephen@student.write-away",
      replySubject: "Re: Reminder: Submit Your Homework by Tomorrow!",
      replyBody: "Hi Rachel, thanks for the reminder! I'll make sure to submit my homework by the deadline. Let me know if there's anything specific I should focus on.",
      currentFolder: "sent"
    },
    {
      id: "2d",
      author: "Stephen@student.write-away",
      replySubject: "Re: Important: Upcoming Parent-Teacher Conference",
      replyBody: "Hi Rachel, thanks for the update. I'll let my parents know about the conference. We'll RSVP by the end of the week.",
      currentFolder: "sent"
    },
    {
      id: "3d",
      author: "Stephen@student.write-away",
      replySubject: "Re: Great Job on the Science Fair!",
      replyBody: "Hi Rachel, thank you for the kind words! I really enjoyed working on my project and seeing everyone else's creativity. It was a great experience!",
      currentFolder: "sent"
    },
    {
      id: "4d",
      author: "Stephen@student.write-away",
      replySubject: "Re: Weekly Assignment Update",
      replyBody: "Hi Rachel, thanks for the update! I'll check the class portal and reach out if I have any questions about the assignments.",
      currentFolder: "sent"
    },
    {
      id: "5d",
      author: "Stephen@student.write-away",
      replySubject: "Re: Class Field Trip Details",
      replyBody: "Hi Rachel, I'm excited for the field trip! I'll make sure to bring my permission slip and lunch as instructed. Thanks for organizing this!",
      currentFolder: "sent"
    },
    {
      id: "1s",
      author: "Stephen@student.write-away",
      replySubject: "Re: Reminder: Submit Your Homework by Tomorrow!",
      replyBody: "Hi Rachel, thanks for the reminder! I'll make sure to...",
      currentFolder: "drafts"
    },
    {
      id: "2s",
      author: "Stephen@student.write-away",
      replySubject: "Re: Important: Upcoming Parent-Teacher Conference",
      replyBody: "Hi Rachel, thanks for the update. I'll let my parents know about...",
      currentFolder: "drafts"
    },
    {
      id: "3s",
      author: "Stephen@student.write-away",
      replySubject: "Re: Great Job on the Science Fair!",
      replyBody: "Hi Rachel, thank you for the kind words! I really enjoyed working on my project and...",
      currentFolder: "drafts"
    },
    {
      id: "4s",
      author: "Stephen@student.write-away",
      replySubject: "Re: Weekly Assignment Update",
      replyBody: "Hi Rachel, thanks for the update! I'll check the class portal and...",
      currentFolder: "drafts"
    },
    {
      id: "5s",
      author: "Stephen@student.write-away",
      replySubject: "Re: Class Field Trip Details",
      body: "Hi Rachel, I'm excited for the field trip! I'll make sure to...",
      currentFolder: "drafts"
    }
    ]);

    useEffect(() => {
      const fetchAllEmails = async () => {
        const emailsData = await emailService.index();
        console.log('emailsData:', emailsData);
        setEmails(emailsData);
      };

    const fetchAllReplies = async () => {
      const repliesData = await replyService.index();
      console.log('repliesData:', repliesData);
      setReplies(repliesData);
    };


    if (user) {
      fetchAllEmails();
      fetchAllReplies();
    }

  }, [user]);
  
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
                      setReplies={setReplies}
                      myJob={'drafts'}
                    />}
                  />
                  <Route
                    path="/sent"
                    element={<ReplyContainer
                      user={user}
                      replies={replies}
                      setReplies={setReplies}
                      myJob={'sent'}
                    />}
                  />
                  {/* Route for Email */}
                  <Route path="/email" element={<Email />} />
                  <Route path="/reply" element={<Reply />} />
                  <Route path="/edit" element={<Edit />} /> 
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
