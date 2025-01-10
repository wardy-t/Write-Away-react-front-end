import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthedUserContext } from '../../App';
import NavBar from '../NavBar/NavBar';
import './reply.css'; // Import the reply.css for styling

const Reply = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {}; // Retrieve the passed email data
  const user = useContext(AuthedUserContext);

  const [to, setTo] = useState(email?.sender || ''); // Default to sender of the original email
  const [subject, setSubject] = useState(email ? `Re: ${email.subject}` : ''); // Default to "Re: {subject}"
  const [message, setMessage] = useState(''); // Initialize empty message body

  // Handle Send Logic
  const handleSend = () => {
    alert('Email sent!');
    // Add logic for sending the email (e.g., API call or state update)
    navigate('/inbox'); // Redirect back to Inbox after sending
  };

  // Handle Save to Drafts Logic
  const handleSaveToDrafts = () => {
    const draft = { to, subject, message, savedAt: new Date() };
    // Simulate saving draft to a drafts collection
    const drafts = JSON.parse(localStorage.getItem('drafts')) || [];
    drafts.push(draft);
    localStorage.setItem('drafts', JSON.stringify(drafts));

    alert('Email saved as draft!');
    navigate('/drafts'); // Redirect to Drafts page
  };

  return (
    <div className="reply-page">
      {/* NavBar */}
      <NavBar handleSignout={() => navigate('/')} />

      {/* Top Ellipse */}
      <div className="top-ellipse"></div>

      {/* Settings Icon */}
      <img
        src="src/components/img/settings.png"
        alt="Settings Icon"
        className="settings-icon"
      />

      {/* Header Rectangle */}
      <div className="header-rectangle">
        <div className="search-container">
          <img
            src="src/components/img/search.png"
            alt="Search Icon"
            className="search-icon"
          />
          <span className="search-text">Search inbox</span>
        </div>
      </div>

      {/* Main Reply Area */}
      <div className="main-rectangle">
        <div className="reply-content-rectangle">
          <form className="reply-form">
            <label className="reply-label">
              <strong>To:</strong>
              <input
                type="email"
                className="reply-input"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Recipient's email"
              />
            </label>
            <label className="reply-label">
              <strong>Subject:</strong>
              <input
                type="text"
                className="reply-input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject"
              />
            </label>
            <label className="reply-label">
              <strong>Message:</strong>
              <textarea
                className="reply-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
              />
            </label>
          </form>
        </div>

        <div className="reply-buttons">
          {/* Conditional Button Rendering */}
          {user?.role === 'student' && (
            <button type="button" className="reply-button" onClick={handleSaveToDrafts}>
              Save to Drafts
            </button>
          )}
          <button type="button" className="reply-button" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reply;
