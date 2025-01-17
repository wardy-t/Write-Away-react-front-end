import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { AuthedUserContext } from '../../App';
import NavBar from '../NavBar/NavBar';
import './Edit.css'


const Edit = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {}; // Retrieve the passed email data
    console.log("is email being passed", email)
  const user = useContext(AuthedUserContext);
  const { id } = useParams();

  // State for the editable fields
  const [editedEmail, setEditedEmail] = useState({
    emailFrom: email?.emailFrom || '',
    emailSubject: email?.emailSubject || '',
    emailBody: email?.emailBody || '',
  });

  useEffect(() => {
    console.log('Editing email with ID:', id);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmail((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const updatedEmail = {
      emailFrom: editedEmail.emailFrom,
      emailSubject: editedEmail.emailSubject,
      emailBody: editedEmail.emailBody,
    };
  
    // Call updateEmail from props to update the email in App.jsx state
    props.updateEmail(id, updatedEmail);  // Make sure this is being called correctly!
  
    console.log('Email saved:', updatedEmail);
    alert('Email updated!');
    navigate('/');  // Navigate back to the inbox (or home page)
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
                name="emailFrom"
                value={user?.username || ''}
                readOnly
              />
            </label>
            <label className="email-label">
              <strong>Subject:</strong>
              <input
                type="text"
                className="email-input"
                name="emailSubject"
                value={editedEmail.emailSubject}
                onChange={handleInputChange}
                placeholder="Email subject"
                required
              />
            </label>
            <label className="email-label">
              <strong>Message:</strong>
              <textarea
                className="email-textarea"
                name="emailBody"
                value={editedEmail.emailBody}
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