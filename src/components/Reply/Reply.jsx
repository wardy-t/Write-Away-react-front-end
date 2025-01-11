import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthedUserContext } from '../../App';

const Reply = () => {
  const location = useLocation();
  const { email } = location.state || {}; // Retrieve the passed email data
  const user = useContext(AuthedUserContext);

  const handleSend = () => {
    alert('Reply sent!');
    // Add logic for sending the reply (e.g., API call)
  };

  const handleSave = () => {
    alert('Reply saved as draft!');
    // Add logic for saving the reply as a draft
  };

  return (
    <div>
      <h1>Replying to Email</h1>
      <form>
      <label>
          <strong>To:</strong>
          <input type="email" value={''} />
        </label>
        <label>
          <strong>From:</strong>
          <input type="email" value={user?.author || ''} />
        </label>
        <label>
          <strong>Subject:</strong>
          <input type="text" value={`Re: ${email?.replySubject || ''}`} />
        </label>
        <label>
          <strong>Message:</strong>
          <textarea placeholder="Write your message here..." />
        </label>
        <div>
          <button type="button" onClick={handleSend}>Send</button>
          <button type="button" onClick={handleSave}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default Reply;