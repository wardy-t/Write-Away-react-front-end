import { useState } from 'react';
import './Email.css'; // Import email-specific styles
import NavBar from '../NavBar/NavBar'; // Import NavBar

import { signout } from '../../services/authService';

const Email = (props, handleSignout) => {
  const [emailDetails, setEmailDetails] = useState({
    to: '',
    emailFrom: '',
    emailSubject: '',
    emailBody: '',
  });

  const handleChange = (evt) => {
    setEmailDetails({ ...emailDetails, [evt.target.name]: evt.target.value });
  };

  const handleSend = (evt) => {
    evt.preventDefault();
    props.handleSendEmail(emailDetails)
    console.log('Sending email with details:', emailDetails);
    alert('Email sent!');
  };

  const handleSave = () => {
    console.log('Saving email draft:', emailDetails);
    const drafts = JSON.parse(localStorage.getItem('drafts')) || [];
    drafts.push(emailDetails);
    localStorage.setItem('drafts', JSON.stringify(drafts));
    alert('Email draft saved!');
  };

  return (
    <div className="email-page">
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

      {/* Main Email Area */}
      <div className="main-rectangle">
        <div className="email-content-rectangle">
          <form className="email-form">
            <label className="email-label">
              <strong>To:</strong>
              <input
                type="email"
                className="email-input"
                id="to"
                name="to"
                value={emailDetails.to}
                onChange={handleChange}
                placeholder="Recipient's email"
                required
              />
            </label>
            <label className="email-label">
              <strong>From:</strong>
              <input
                type="email"
                className="email-input"
                id="emailFrom"
                name="emailFrom"
                value={emailDetails.emailFrom}
                onChange={handleChange}
                placeholder="Your email"
                required
              />
            </label>
            <label className="email-label">
              <strong>Subject:</strong>
              <input
                type="text"
                className="email-input"
                id="emailSubject"
                name="emailSubject"
                value={emailDetails.emailSubject}
                onChange={handleChange}
                placeholder="Email subject"
                required
              />
            </label>
            <label className="email-label">
              <strong>Message:</strong>
              <textarea
                className="email-textarea"
                id="emailBody"
                name="emailBody"
                value={emailDetails.emailBody}
                onChange={handleChange}
                placeholder="Write your message here"
                rows="6"
                required
              ></textarea>
            </label>
          </form>
        </div>

        {/* Buttons */}
        <div className="email-buttons">
          <button
            type="button"
            className="save-to-drafts-button"
            onClick={handleSave}
          >
            Save to Drafts
          </button>
          <button type="button" className="send-button" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Email;
