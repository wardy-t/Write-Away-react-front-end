import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReplyContainer.css';

const ReplyContainer = (props) => {
  const user = useContext(AuthedUserContext);
  const navigate = useNavigate();

  const handleReply = (email) => {
    console.log('handle reply')
    navigate('/reply', { state: { email } }); 
    //Is this the reason for dupe? HandleReply and HandleSendReply doing same job?
  };

 // const handleEdit = (email) => {
    // Logic to edit the selected email
   // navigate('/edit', { state: { email } });
 // };

  const handleDelete = (_id) => {
    props.handleDeleteReply(_id)
  };
  //  const updatedReplies = props.replies.filter((reply) => reply.id !== emailId);
   // props.setReplies(updatedReplies); // Update the main state in App
   // alert('Reply deleted successfully!');
 // };

  console.log("props.replies", props.replies);

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
            {props.myJob === 'drafts' ? 'Search drafts' : 'Search sent emails'}
          </span>
        </div>
      </div>

      {/* Main Rectangle */}
      <div className="main-rectangle">
        <h1>Welcome, {user.username}</h1>
        <p>
          {props.myJob === 'drafts'
            ? 'Here are your saved drafts.'
            : 'Here are your sent emails.'}
        </p>

        <section>
          <h2>{props.myJob === 'drafts' ? 'drafts' : 'sent'}</h2>
          <div className="reply-container">
            {props.replies.map((reply) => (
              props.myJob === reply.currentFolder ? (
                <div key={reply._id} className="email">
                  <h3>{reply.replySubject}</h3>
                  <p>
                    <strong>From:</strong> {reply.author.username}
                  </p>
                  <p>{reply.replyBody}</p>
                  <div className="email-buttons">
  {/* Show "Reply" button only if the current folder is NOT "sent" and the email is not replied */}
                  {props.myJob !== 'sent' && !reply.isReplied ? (
                  <button className="reply-button" onClick={() => handleReply(reply)}>Reply</button>
                  ) : (
    // Show "Replied" message if the email is in drafts and already replied
                   props.myJob !== 'sent' && <p><em>Replied</em></p>
                    )}

                    {/* Show "Delete" button for both "drafts" and "sent" folders */}
                    {props.myJob === 'drafts' || props.myJob === 'sent' ? (
                     <button className="reply-button" onClick={() => handleDelete(reply._id)}>Delete</button>
                     ) : null}
                    
                  </div>
                </div>
              ) : null
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};



export default ReplyContainer;