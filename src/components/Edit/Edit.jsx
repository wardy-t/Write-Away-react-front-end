import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { AuthedUserContext } from '../../App';
import NavBar from '../NavBar/NavBar';
import './Edit.css'


const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {}; // Retrieve the passed email data
  const user = useContext(AuthedUserContext);
  const { id } = useParams();

  // State for the editable fields
  const [editedEmail, setEditedEmail] = useState({
    To: email?.to || '',
    subject: email?.subject || '',
    body: email?.body || '',
  });

  useEffect(() => {
    console.log('Editing email with ID:', id);
    // Optionally, fetch the email data using the ID if it wasn't passed via `location.state`
  }, [id]);

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
    <div className="email-page">
      {/* NavBar */}
      <NavBar handleSignout={() => navigate('/signin')} />

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

      {/* Main Email Area */}
      <div className="main-rectangle">
        <div className="email-content-rectangle">
          <form className="email-form">
            <label className="email-label">
              <strong>To:</strong>
              <input
                type="email"
                className="email-input"
                name="to"
                value={editedEmail.to}
                onChange={handleInputChange}
                placeholder="Recipient's email"
                required
              />
            </label>
            <label className="email-label">
              <strong>From:</strong>
              <input
                type="email"
                className="email-input"
                value={user?.username || ''}
                readOnly
              />
            </label>
            <label className="email-label">
              <strong>Subject:</strong>
              <input
                type="text"
                className="email-input"
                name="subject"
                value={editedEmail.subject}
                onChange={handleInputChange}
                placeholder="Email subject"
                required
              />
            </label>
            <label className="email-label">
              <strong>Message:</strong>
              <textarea
                className="email-textarea"
                name="body"
                value={editedEmail.body}
                onChange={handleInputChange}
                placeholder="Write your message here"
                rows="6"
                required
              ></textarea>
            </label>
          </form>
        </div>

        {/* Buttons */}
        <div className="email-buttons">
          <button type="button" className="send-button" onClick={handleSave}>
            Save
          </button>
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;