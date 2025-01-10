import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthedUserContext } from '../../App';
import NavBar from '../NavBar/NavBar';
import './compose.css'; // Import the compose.css for styling

const Compose = ({ handleSignout }) => {
  const navigate = useNavigate();
  const user = useContext(AuthedUserContext);

  const [to, setTo] = useState(''); // Empty "To" field
  const [subject, setSubject] = useState(''); // Empty "Subject" field
  const [message, setMessage] = useState(''); // Empty "Message" field

  // Handle Send Logic
  const handleSend = () => {
    alert('Email sent!');
    // Add logic for sending the email
    navigate('/inbox'); // Redirect to Inbox
  };

  // Handle Save to Drafts Logic
  const handleSaveToDrafts = () => {
    const draft = { to, subject, message, savedAt: new Date() };
    const drafts = JSON.parse(localStorage.getItem('drafts')) || [];
    drafts.push(draft);
    localStorage.setItem('drafts', JSON.stringify(drafts));

    alert('Email saved as draft!');
    navigate('/drafts'); // Redirect to Drafts page
  };

  return (
    <div className="compose-page">
      {/* NavBar */}
      <NavBar handleSignout={handleSignout} />

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
          <span className="search-text">Compose Email</span>
        </div>
      </div>

      {/* Main Compose Area */}
      <div className="main-rectangle">
        <div className="compose-content-rectangle">
          <form className="compose-form">
            <label className="compose-label">
              <strong>To:</strong>
              <input
                type="email"
                className="compose-input"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Recipient's email"
              />
            </label>
            <label className="compose-label">
              <strong>Subject:</strong>
              <input
                type="text"
                className="compose-input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject"
              />
            </label>
            <label className="compose-label">
              <strong>Message:</strong>
              <textarea
                className="compose-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
              />
            </label>
          </form>
        </div>

        <div className="compose-buttons">
          {user?.role === 'student' && (
            <button
              type="button"
              className="save-to-drafts-button"
              onClick={handleSaveToDrafts}
            >
              Save to Drafts
            </button>
          )}
          <button type="button" className="send-button" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Compose;
