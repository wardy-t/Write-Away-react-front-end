import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';
import './NavBar.css'; // Import CSS for the NavBar

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);

  return (
    <>
      {user ? (
        <nav>
          <ul>
            <li>
              <Link to="/">Inbox</Link>
            </li>
            <li>
              <Link to="/drafts">Drafts</Link>
            </li>
            <li>
              <Link to="/sent">Sent</Link>
            </li>
            <li>
              <Link to="" onClick={handleSignout}>
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav></nav> // Empty nav for unauthenticated users
      )}
    </>
  );
};

export default NavBar;
