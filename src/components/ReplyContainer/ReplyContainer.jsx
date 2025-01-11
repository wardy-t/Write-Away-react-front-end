import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReplyContainer.css';

const ReplyContainer = (props) => {
  const user = useContext(AuthedUserContext);
  const navigate = useNavigate();

  const handleReply = (email) => {
    navigate('/reply', { state: { email } });
  };

  const handleEdit = (email) => {
    // Logic to edit the selected email
    navigate('/edit', { state: { email } });
  };

  const handleDelete = (emailId) => {
    const updatedReplies = props.replies.filter((reply) => reply.id !== emailId);
    props.setReplies(updatedReplies); // Update the main state in App
    alert('Reply deleted successfully!');
  };

  return (
    <div className="reply-page">
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
          <span className="search-text">
            {props.currentFolder === 'drafts' ? 'Search drafts' : 'Search sent emails'}
          </span>
        </div>
      </div>

      {/* Main Rectangle */}
      <div className="main-rectangle">
        <h1>Welcome, {user.username}</h1>
        <p>
          {props.currentFolder === 'drafts'
            ? 'Here are your saved drafts.'
            : 'Here are your sent emails.'}
        </p>

        <section>
          <h2>{props.currentFolder === 'drafts' ? 'Drafts' : 'Sent Emails'}</h2>
          <div className="reply-container">
            {props.replies.map((reply) => (
              props.currentFolder === reply.currentFolder && (
                <div key={reply.id} className="email">
                  <h3>{reply.replySubject}</h3>
                  <p>
                    <strong>From:</strong> {reply.author}
                  </p>
                  <p>{reply.replyBody}</p>
                  {!reply.isReplied && (
                    <button onClick={() => handleReply(reply)}>Reply</button>
                  )}
                  {reply.isReplied && <p><em>Replied</em></p>}
                  {props.currentFolder === 'drafts' && (
                    <>
                      <button onClick={() => handleEdit(reply)}>Edit</button>
                      <button onClick={() => handleDelete(reply.id)}>Delete</button>
                    </>
                  )}
                </div>
              )
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReplyContainer;