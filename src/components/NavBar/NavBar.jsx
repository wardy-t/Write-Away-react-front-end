import { Link, useNavigate } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import './NavBar.css'; // Import CSS for the NavBar

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  const navigate = useNavigate(); // Hook for navigation

  // Modified handleSignout function
  const handleSignoutClick = () => {
    handleSignout(); // Call the original signout logic
    navigate('/'); // Redirect to Landing page
  };

  return (
    <>
      {user ? (
        <>
          {/* Left Sidebar */}
          <div className="left-rectangle">
            <div className="sidebar-ellipse"></div>
            
            {/* Compose Button */}
            <Link to="/compose" className="compose-button">
              Compose
            </Link>
  
            {/* Menu Buttons */}
            <div className="menu-buttons">
              <Link to="/inbox" className="menu-button active">
                Inbox
              </Link>
              {user.role === 'student' && (
                <>
                  <Link to="/drafts" className="menu-button">
                    Drafts
                  </Link>
                  <Link to="/sent" className="menu-button">
                    Sent
                  </Link>
                </>
              )}
              <button className="menu-button" onClick={handleSignoutClick}>
                Sign Out
              </button>
            </div>
          </div>
        </>
      ) : (
        <nav></nav> // Empty nav for unauthenticated users
      )}
    </>
  );
  
};

export default NavBar;
