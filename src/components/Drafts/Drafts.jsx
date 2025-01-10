import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './drafts.css';

const Drafts = ({ handleSignout }) => {
  const [drafts, setDrafts] = useState([]);
  const [selectedDraft, setSelectedDraft] = useState(null);
  const navigate = useNavigate();

  // Load drafts from localStorage
  useEffect(() => {
    const savedDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
    setDrafts(savedDrafts);
  }, []);

  // Save updates to drafts in localStorage
  const saveDraftUpdates = () => {
    const updatedDrafts = drafts.map((draft) =>
      draft === selectedDraft ? selectedDraft : draft
    );
    localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
    setDrafts(updatedDrafts);
    alert('Draft updated!');
    setSelectedDraft(null);
  };

  // Handle sending the draft
  const handleSend = () => {
    alert('Draft sent!');
    // Logic for sending the email can be added here
    setDrafts(drafts.filter((draft) => draft !== selectedDraft)); // Remove from drafts
    localStorage.setItem('drafts', JSON.stringify(drafts));
    navigate('/inbox'); // Redirect to Inbox after sending
  };

  // Handle selecting a draft to edit
  const handleDraftClick = (draft) => {
    setSelectedDraft(draft);
  };

  // Handle back to drafts list
  const handleBackToDrafts = () => {
    setSelectedDraft(null);
  };

  return (
    <div className="drafts-page">
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
          <span className="search-text">Search drafts</span>
        </div>
      </div>

      {/* Main Rectangle */}
      <div className="main-rectangle">
        {selectedDraft ? (
          <>
            {/* Draft Content Container */}
            <div className="drafts-content-rectangle">
              <form className="draft-form">
                <label className="draft-label">
                  <strong>To:</strong>
                  <input
                    type="email"
                    className="draft-input"
                    value={selectedDraft.to}
                    onChange={(e) =>
                      setSelectedDraft({ ...selectedDraft, to: e.target.value })
                    }
                  />
                </label>
                <label className="draft-label">
                  <strong>Subject:</strong>
                  <input
                    type="text"
                    className="draft-input"
                    value={selectedDraft.subject}
                    onChange={(e) =>
                      setSelectedDraft({
                        ...selectedDraft,
                        subject: e.target.value,
                      })
                    }
                  />
                </label>
                <label className="draft-label">
                  <strong>Message:</strong>
                  <textarea
                    className="draft-textarea"
                    value={selectedDraft.message}
                    onChange={(e) =>
                      setSelectedDraft({
                        ...selectedDraft,
                        message: e.target.value,
                      })
                    }
                  />
                </label>
              </form>
            </div>

            {/* Buttons */}
            <div className="draft-buttons">
              <button
                type="button"
                className="draft-button"
                onClick={saveDraftUpdates}
              >
                Save to Drafts
              </button>
              <button
                type="button"
                className="draft-button"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="drafts-list">
            {drafts.length > 0 ? (
              drafts.map((draft, index) => (
                <div
                  key={index}
                  className="draft"
                  onClick={() => handleDraftClick(draft)}
                >
                  <h3>{draft.subject || 'No Subject'}</h3>
                  <p>
                    <strong>To:</strong> {draft.to || 'No Recipient'}
                  </p>
                  <p>
                    <strong>Message:</strong> {draft.message || 'No Message'}
                  </p>
                </div>
              ))
            ) : (
              <p>No drafts saved.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Drafts;
