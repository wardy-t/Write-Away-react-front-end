import { AuthedUserContext } from '../../App';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './EmailContainer.css';

const EmailContainer = ({ handleSignout, emails, handleDeleteEmail }) => {
  const user = useContext(AuthedUserContext);
  const navigate = useNavigate();

  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleReply = () => {
    if (selectedEmail) {
      navigate('/reply', { state: { email: selectedEmail } });
    }
  };

  const handleDelete = (_id) => {
    handleDeleteEmail(_id)
  };

  const handleBackToInbox = () => {
    setSelectedEmail(null);
  };

  return (
    <div className="email-container-page">
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
          <span className="search-text">Search emails...</span>
        </div>
      </div>

      {/* Main Rectangle */}
      <div className="main-rectangle">
        {selectedEmail ? (
          <>
            {/* Email Content Rectangle */}
            <div className="email-content-rectangle">
              <h2>{selectedEmail.emailSubject}</h2>
              <p>
                <strong>From:</strong> {selectedEmail.emailFrom}
              </p>
              <p>{selectedEmail.emailBody}</p>
            </div>

            {/* Buttons */}
            <div className="email-buttons">
              <button className="reply-button" onClick={handleBackToInbox}>
                Back to Inbox
              </button>
              {!selectedEmail.isReplied && (
                <button className="reply-button" onClick={handleReply}>
                  Reply
                </button>
              )}
              <button
              className="reply-button"
              onClick={() => navigate(`/${selectedEmail._id}`)}
              >Edit</button>
              <button 
              className='reply-button' 
              onClick={() => {
                handleDelete(selectedEmail._id);
                handleBackToInbox();
              }}

              >Delete</button>
            </div>
          </>
        ) : (
          <>
            <h1>Hi {user.username}</h1>
            <p>
              This is your Inbox. Here you can practice writing, sending, and
              receiving email messages!
            </p>

            <div className="email-list">
              
              {emails.length > 0 ? (
                emails.map((email) => (
                <div
                  key={email._id}
                  className="email"
                  onClick={() => handleEmailClick(email)}
                >
                  <h3>{email.emailSubject}</h3>
                  <p>
                    <strong>From:</strong> {email.emailFrom}
                  </p>
                  <p>{email.emailBody}</p>
                </div>
              ))
            ) : (
              <p>No emails available.</p>
            )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailContainer;
