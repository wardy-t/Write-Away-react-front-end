import React from "react";
import "./Dashboard.css"; // Import CSS for Dashboard

const Dashboard = () => {
  return (
    <div className="inbox-container">
      {/* Left Sidebar */}
      <div className="left-rectangle">
        <div className="sidebar-ellipse"></div>
        <button className="compose-button">Compose</button>
        <div className="menu-buttons">
          <button className="menu-button active">Inbox</button>
          <button className="menu-button">Drafts</button>
          <button className="menu-button">Sent</button>
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
      <div className="main-rectangle"></div>
    </div>
  );
};

export default Dashboard;
