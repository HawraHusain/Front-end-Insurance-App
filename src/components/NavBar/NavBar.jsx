import { useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import styles from './NavBar.module.css';
const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav>
      {user ? (
        <ul>
          <button><Link to='/company'>Companies</Link></button>
          <button><Link to='/company/new'>Add Company</Link></button>
          <button><Link to='/insurance'>Insurance policy</Link></button>
          <button><Link to='/insurance/new'>Add insurance</Link></button>
          <button><Link to='/' onClick={handleSignOut}>Sign Out</Link></button>
        </ul>
      ) : (
        <ul>
          <button><Link to='/'>Home</Link></button>
          <button><Link to='/sign-in'>Sign In</Link></button>
          <button><Link to='/sign-up'>Sign Up</Link></button>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
