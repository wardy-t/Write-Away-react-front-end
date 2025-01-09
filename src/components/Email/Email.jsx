import { useState } from 'react';

const Email = () => {
  const [emailDetails, setEmailDetails] = useState({
    to: '',
    from: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  const handleSend = () => {
    console.log('Sending email with details:', emailDetails);
    // You can add your send email logic here (e.g., API call)
    alert('Email sent!');
  };

  const handleSave = () => {
    console.log('Saving email draft:', emailDetails);
    // You can add your save logic here (e.g., saving the draft locally or in a database)
    alert('Email draft saved!');
  };

  return (
    <div className="email-container">
      <h2>Write a New Message</h2>
      <form>
        <div className="form-group">
          <label htmlFor="to">To:</label>
          <input
            type="email"
            id="to"
            name="to"
            value={emailDetails.to}
            onChange={handleChange}
            placeholder="Recipient's email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="from">From:</label>
          <input
            type="email"
            id="from"
            name="from"
            value={emailDetails.from}
            onChange={handleChange}
            placeholder="Your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={emailDetails.subject}
            onChange={handleChange}
            placeholder="Email subject"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={emailDetails.message}
            onChange={handleChange}
            placeholder="Write your message here"
            rows="6"
            required
          ></textarea>
        </div>
        <div className="form-buttons">
          <button type="button" onClick={handleSend}>Send</button>
          <button type="button" onClick={handleSave}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default Email;