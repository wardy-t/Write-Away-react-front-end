import { AuthedUserContext } from '../../App';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './inbox.css';

const Inbox = () => {
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

  const handleReply = (email) => {
    // Navigate to Reply component and pass email details via state
    navigate('/reply', { state: { email } });
  };

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is your Inbox. Here you can practice writing, sending, and receiving email messages!
      </p>

      <section>
        <h2>Your Inbox</h2>
        <div className="inbox-container">
          {emails.map((email) => (
            <div key={email.id} className="email">
              <h3>{email.subject}</h3>
              <p>
                <strong>From:</strong> {email.sender}
              </p>
              <p>{email.body}</p>
              {!email.isReplied && (
                <button onClick={() => handleReply(email)}>Reply</button>
              )}
              {email.isReplied && <p><em>Replied</em></p>}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Inbox;
