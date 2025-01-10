import { AuthedUserContext } from '../../App';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import NavBar from '../NavBar/NavBar'; // Import the NavBar component
import './inbox.css';

const Inbox = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  const navigate = useNavigate(); // Initialize navigate

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
      isReplied: true,
    },
  ]);

  // Track the selected email
  const [selectedEmail, setSelectedEmail] = useState(null);

  // Handle clicking an email
  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  // Handle reply
  const handleReply = () => {
    if (selectedEmail) {
      navigate('/reply', { state: { email: selectedEmail } }); // Navigate to Reply.jsx with selected email data
    }
  };

  // Handle back to inbox
  const handleBackToInbox = () => {
    setSelectedEmail(null);
  };

  return (
    <div className="inbox-page">
      <NavBar handleSignout={handleSignout} />

      <div className="top-ellipse"></div>

      <img
        src="src/components/img/settings.png"
        alt="Settings Icon"
        className="settings-icon"
      />

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

      <main>
        <section>
          <div className="main-rectangle">
            {selectedEmail ? (
              <>
                {/* Email Content Rectangle */}
                <div className="email-content-rectangle">
                  <h2>{selectedEmail.subject}</h2>
                  <p>
                    <strong>From:</strong> {selectedEmail.sender}
                  </p>
                  <p>{selectedEmail.body}</p>
                </div>

                {/* Buttons at the Bottom */}
                <div className="email-buttons">
                  <button className="reply-button" onClick={handleBackToInbox}>
                    Back to Inbox
                  </button>
                  {!selectedEmail.isReplied && (
                    <button className="reply-button" onClick={handleReply}>
                      Reply
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="email-list">
                {emails.map((email) => (
                  <div
                    key={email.id}
                    className="email"
                    onClick={() => handleEmailClick(email)}
                  >
                    <h3>{email.subject}</h3>
                    <p>
                      <strong>From:</strong> {email.sender}
                    </p>
                    <p>{email.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Inbox;
