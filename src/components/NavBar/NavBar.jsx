import { useContext } from 'react';
import { Link ,useLocation } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import'./NavBar.module.css';
const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation(); 

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  const isActiveLink = (path) => location.pathname === path;
  return (
    <nav>
      <h1>Insurance Policy APP</h1>
      {user ? (
        <ul>
          {!isActiveLink('/') && <button><Link to='/'>Home</Link></button>}
          {!isActiveLink('/company') && <button><Link to='/company'>Companies</Link></button>}
          {!isActiveLink('/company/new') && <button><Link to='/company/new'>Add Company</Link></button>}
          {!isActiveLink('/insurance') && <button><Link to='/insurance'>Insurance policy</Link></button>}
          {!isActiveLink('/insurance/new') && <button><Link to='/insurance/new'>Add insurance</Link></button>}
          {!isActiveLink('/') && <button><Link to='/' onClick={handleSignOut}>Sign Out</Link></button>}
        </ul>
      ) : (
        <ul>
          {!isActiveLink('/') && <button><Link to='/'>Home</Link></button>}
          {!isActiveLink('/sign-in') && <button><Link to='/sign-in'>Sign In</Link></button>}
          {!isActiveLink('/sign-up') && <button><Link to='/sign-up'>Sign Up</Link></button>}
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
