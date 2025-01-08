import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./Dashboard.css"; // Import CSS for Dashboard

const Dashboard = () => {
  const [emails, setEmails] = useState([]); // State to store emails
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
  const decodedToken = jwtDecode(token); // Decode token to get user details
  const userRole = decodedToken.role; // Determine the user's role

  useEffect(() => {
    // Fetch emails based on user role
    const fetchEmails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/emails", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmails(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch emails.");
        setLoading(false);
      }
    };

    fetchEmails();
  }, [token]);

  if (loading) return <p>Loading...</p>; // Show loading indicator
  if (error) return <p>{error}</p>; // Show error message

  return (
    <div className="inbox-container">
      {/* Left Sidebar */}
      <div className="left-rectangle">
        <div className="sidebar-ellipse"></div>
        <button className="compose-button">Compose</button>
        <div className="menu-buttons">
          <button className="menu-button active">Inbox</button>
          {userRole === "student" && (
            <>
              <button className="menu-button">Drafts</button>
              <button className="menu-button">Sent</button>
            </>
          )}
        </div>
      </div>

      {/* Ellipse at Top-Right */}
      <div className="top-ellipse"></div>

      {/* Settings Icon */}
      <img src="./img/settings.png" alt="Settings Icon" className="settings-icon" />

      {/* Header Rectangle */}
      <div className="header-rectangle">
        <div className="search-container">
          <img src="./img/search.png" alt="Search Icon" className="search-icon" />
          <span className="search-text">Search inbox</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-rectangle">
        <h2>Inbox</h2>
        {emails.length === 0 ? (
          <p>No emails to display.</p>
        ) : (
          <ul className="email-list">
            {emails.map((email) => (
              <li key={email._id} className="email-item">
                <h3>{email.emailSubject}</h3>
                <p>{email.emailBody}</p>
                <p>
                  <strong>From:</strong> {email.author?.username}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
