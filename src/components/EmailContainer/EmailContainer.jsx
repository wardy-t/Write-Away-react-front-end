import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './EmailContainer.css';

const EmailContainer = (props) => {
  const user = useContext(AuthedUserContext);
  const navigate = useNavigate(); // Initialize navigate



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
          {props.emails.map((email) => (
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

export default EmailContainer;