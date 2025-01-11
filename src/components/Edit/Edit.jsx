import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthedUserContext } from '../../App';

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {}; // Retrieve the passed email data
  const user = useContext(AuthedUserContext);

  // State for the editable fields
  const [editedEmail, setEditedEmail] = useState({
    to: email?.to || '',
    subject: email?.subject || '',
    body: email?.body || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmail((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert('Draft updated!');
    // Add logic for saving the edited email (e.g., API call or state update)
    navigate('/drafts'); // Redirect back to drafts after saving
  };

  const handleCancel = () => {
    navigate('/drafts'); // Redirect back to drafts without saving
  };

  return (
    <div>
      <h1>Editing Draft Email</h1>
      <form>
        <label>
          <strong>To:</strong>
          <input
            type="email"
            name="to"
            value={editedEmail.to}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <strong>From:</strong>
          <input type="email" value={user?.username || ''} readOnly />
        </label>
        <label>
          <strong>Subject:</strong>
          <input
            type="text"
            name="subject"
            value={editedEmail.subject}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <strong>Message:</strong>
          <textarea
            name="body"
            value={editedEmail.body}
            onChange={handleInputChange}
          />
        </label>
        <div>
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;