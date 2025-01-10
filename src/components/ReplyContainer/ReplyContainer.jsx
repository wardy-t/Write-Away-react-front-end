import { AuthedUserContext } from '../../App';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ReplyContainer.css';

const ReplyContainer = (props) => {
  const user = useContext(AuthedUserContext);
  const navigate = useNavigate(); // Initialize navigate


  const handleReply = (email) => {
    // Navigate to Reply component and pass email details via state
    navigate('/reply', { state: { email } });
  };

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is your Inbox. Here you can practice writing, sending, and receiving email messages!
      </p>

      <section>
        <h2>Your Inbox</h2>
        <div className="inbox-container">
          {props.replies.map((reply) => (
            <>{
              props.myJob === reply.currentFolder
              
              ? 
            
              <div key={reply.id} className="email">
              <h3>{reply.subject}</h3>
              <p>
                <strong>From:</strong> {reply.sender}
              </p>
              <p>{reply.body}</p>
              {!reply.isReplied && (
                <button onClick={() => handleReply(reply)}>Reply</button>
              )}
              {reply.isReplied && <p><em>Replied</em></p>}
            </div>
            
            :
            
            null
            
            }</>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ReplyContainer;