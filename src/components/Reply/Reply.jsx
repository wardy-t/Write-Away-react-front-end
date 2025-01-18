import { useState } from 'react';
import './Reply.css'; // Import email-specific styles
import NavBar from '../NavBar/NavBar';
import { useLocation } from 'react-router-dom'




const Reply = (props, handleSignout) => {
  const location = useLocation();
  console.log('location.state:', location.state)
  const email = location.state?.email




  const [replyDetails, setReplyDetails] = useState({
    replyTo: email ? email.author.username : '',
    replySubject: email ? email.replySubject : '',
    replyBody: '',
    currentFolder: '',
  });

  const handleChange = (evt) => {
    setReplyDetails({ ...replyDetails, [evt.target.name]: evt.target.value });
  };

  const handleSend = (evt) => {
    evt.preventDefault();
    console.log('handleSave called');

    // Create the updated details object
    const updatedDetails = { ...replyDetails, currentFolder: 'sent' };

    // Log and send the reply
    console.log('Saving Reply as sent:', updatedDetails);
    props.handleSendReply(updatedDetails);

    // Update the state with the new details
    setReplyDetails(updatedDetails);

    // Show alert
    alert('Reply Sent!');
  };

  const handleSave = (evt) => {
    evt.preventDefault();
    console.log('handleSave called');

    // Create the updated details object
    const updatedDetails = { ...replyDetails, currentFolder: 'drafts' };

    // Log and send the reply
    console.log('Saving Reply as drafts:', updatedDetails);
    props.handleSendReply(updatedDetails);

    // Update the state with the new details
    setReplyDetails(updatedDetails);

    // Show alert
    alert('Reply Saved!');
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