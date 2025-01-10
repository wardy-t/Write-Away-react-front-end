import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

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
              <Link to="/email">New</Link>
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
      ) : null }
    </>
  );
};
export default NavBar;
