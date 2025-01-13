import { useState } from 'react';
import './Reply.css'; // Import email-specific styles
import NavBar from '../NavBar/NavBar';


const Reply = (props, handleSignout) => {
  const [replyDetails, setReplyDetails] = useState({
    replyTo: '',
    replySubject: '',
    replyBody: '',
  });


  const handleChange = (evt) => {
    setReplyDetails({ ...replyDetails, [evt.target.name]: evt.target.value });
  };

  const handleSend = (evt) => {
    evt.preventDefault();
    props.handleSendReply(replyDetails)
    console.log('Sending Reply with details:', replyDetails);
    alert('Reply sent!');
  };

  const handleSave = () => {
    alert('Reply saved as draft!');
    console.log('Saving reply draft:', replyDetails);
    const drafts = JSON.parse(localStorage.getItem('drafts')) || [];
    drafts.push(replyDetails);
    localStorage.setItem('drafts', JSON.stringify(drafts));
    alert('Reply draft saved!');
  };

  return (
    <div className="reply-page">
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
          <span className="search-text">Compose Reply</span>
        </div>
    </div>

    <div className="main-rectangle">
        <div className="email-content-rectangle">
          <form className="email-form">
            <label className="email-label">
              <strong>To:</strong>
              <input
                type="email"
                className="email-input"
                id="replyTo"
                name="replyTo"
                value={replyDetails.to}
                onChange={handleChange}
                placeholder="Recipient's email"
                required
              />
            </label>
            <label className="email-label">
              <strong>Subject:</strong>
              <input
                type="text"
                className="email-input"
                id="replySubject"
                name="replySubject"
                value={replyDetails.replySubject}
                onChange={handleChange}
                placeholder="Email subject"
                required
              />
            </label>
            <label className="email-label">
              <strong>Message:</strong>
              <textarea
                className="email-textarea"
                id="replyBody"
                name="replyBody"
                value={replyDetails.replyBody}
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

export default Reply;