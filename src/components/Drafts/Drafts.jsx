import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './Drafts.css';

const Drafts = ({ handleSignout }) => {
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    // Load drafts from localStorage
    const savedDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
    setDrafts(savedDrafts);
  }, []);

  const handleEditDraft = (draft) => {
    // Navigate to Reply.jsx with draft data for editing
    navigate('/reply', { state: { email: draft } });
  };

  return (
    <div className="drafts-page">
      <NavBar handleSignout={handleSignout} />
      <h1>Your Drafts</h1>
      <div className="drafts-container">
        {drafts.length === 0 ? (
          <p>No drafts saved.</p>
        ) : (
          drafts.map((draft, index) => (
            <div
              key={index}
              className="draft-item"
              onClick={() => handleEditDraft(draft)}
            >
              <h3>{draft.subject}</h3>
              <p>
                <strong>To:</strong> {draft.to}
              </p>
              <p>{draft.message.substring(0, 50)}...</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Drafts;
