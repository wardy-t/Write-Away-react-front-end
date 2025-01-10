import { AuthedUserContext } from '../../App';
import { useContext, useState } from 'react';
import NavBar from '../NavBar/NavBar'; // Import the NavBar component
import './inbox.css';

const Inbox = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);

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

  const handleReply = (emailId) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === emailId ? { ...email, isReplied: true } : email
      )
    );
    alert('Reply sent!');
  };

  return (
    <div className="inbox-page">
      {/* NavBar at the top or side */}
      <NavBar handleSignout={handleSignout} />

      {/* Ellipse at Top-Right */}
      <div className="top-ellipse"></div>

      {/* Settings Icon */}
      <img src="src/components/img/settings.png" alt="Settings Icon" className="settings-icon" />

      {/* Header Rectangle */}
      <div className="header-rectangle">
        <div className="search-container">
          <img src="src/components/img/search.png" alt="Search Icon" className="search-icon" />
          <span className="search-text">Search inbox</span>
        </div>
      </div>

      <main>
        <section>
          <div className="main-rectangle">
            {/* Welcome Message */}
            <h1>Welcome, {user?.username || 'User'}</h1>
            <p>
              This is your Inbox. Here you can practice writing, sending, and
              receiving email messages!
            </p>

            {/* Email List */}
            {emails.map((email) => (
              <div key={email.id} className="email">
                <h3>{email.subject}</h3>
                <p>
                  <strong>From:</strong> {email.sender}
                </p>
                <p>{email.body}</p>
                {!email.isReplied && (
                  <button onClick={() => handleReply(email.id)}>Reply</button>
                )}
                {email.isReplied && <p><em>Replied</em></p>}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Inbox;
