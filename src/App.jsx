import { useState, useEffect, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import EmailContainer from './components/EmailContainer/EmailContainer';
import ReplyContainer from './components/ReplyContainer/ReplyContainer';
import Email from './components/Email/Email'; // Import the Email component
import Reply from './components/Reply/Reply';
import Edit from './components/Edit/Edit'
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; // import the authservice
import * as emailService from '../src/services/emailService';
import * as replyService from '../src/services/replyService';


export const AuthedUserContext = createContext(null);



const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice
  const navigate = useNavigate();

  const handleSendEmail = async (emailDetails) => {
    const newEmail = await emailService.create(emailDetails);
    setEmails([newEmail, ...emails])
    console.log('emailDetails', emailDetails);
    navigate('/');
  };

  const handleSendReply = async (replyDetails) => {
    const newReply = await replyService.createReply(replyDetails);
    setReplies([newReply, ...replies])
    console.log('replyDetails', replyDetails);
    navigate('/');
  };


  const updateEmail = async (_id, updatedEmail) => {
    try {
        // First, update the email in the database
      await emailService.updateEmail(_id, updatedEmail);
        
        // After a successful response, update the email in the local state
        setEmails(prevEmails => 
          prevEmails.map(email => 
            email._id === _id ? { ...email, ...updatedEmail } : email
          )
        );
    
        console.log('Email updated successfully!');
      } catch (error) {
        console.error('Error updating email:', error);
        alert('Failed to update the email.');
      }
    };


  const handleDeleteEmail = async (emailId) => {
    console.log("Deleting email with ID:", emailId);   
    try {
      await emailService.deleteEmail(emailId);
  
      setEmails(prevEmails => prevEmails.filter(email => email._id !== emailId));
      
      alert('Email deleted successfully!');
    } catch (error) {
      console.error('Error deleting email:', error);
      alert('There was an error deleting the email.');
    }
  };

  const handleDeleteReply = async (replyId) => {
    console.log("Deleting reply with ID:", replyId);   
    try {
      await replyService.deleteReply(replyId);
  
      setReplies(prevReplies => prevReplies.filter(reply => reply._id !== replyId));
      
      alert('Reply deleted successfully!');
    } catch (error) {
      console.error('Error deleting reply:', error);
      alert('There was an error deleting the reply.');
    }
  };

  // Mock email data
  const [emails, setEmails] = useState([]);

  const [replies, setReplies] = useState([]);

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
                    element={<EmailContainer 
                      user={user} 
                      emails={emails} 
                      handleDeleteEmail={handleDeleteEmail}
                      />}
                  />
                  <Route
                    path="/drafts"
                    element={<ReplyContainer
                      user={user}
                      replies={replies}
                      setReplies={setReplies}
                      myJob={'drafts'}
                      handleDeleteReply={handleDeleteReply}
                    />}
                  />
                  <Route
                    path="/sent"
                    element={<ReplyContainer
                      user={user}
                      replies={replies}
                      setReplies={setReplies}
                      myJob={'sent'}
                      handleDeleteReply={handleDeleteReply}
                    />}
                  />
                  {/* Route for Email */}
                  <Route path="/email" element={<Email handleSendEmail={handleSendEmail}/>} />
                  <Route path="/reply" element={<Reply handleSendReply={handleSendReply}/>} />
                  <Route path="/:id" element={<Edit updateEmail={updateEmail}/>} />
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
