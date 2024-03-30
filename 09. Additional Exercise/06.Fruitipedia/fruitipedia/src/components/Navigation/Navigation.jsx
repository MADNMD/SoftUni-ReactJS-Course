import { Link } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';

export const Navigation = () => {

  const { isAuthenticated } = useAuthContext();

  return (
    <header>
      <Link id="logo" to="/"><img id="logo-img" src="./public/images/logo.png" alt="" /></Link>

      <nav>
        <div>
          <Link to="/catalog">Fruits</Link>
          <Link to="/search">Search</Link>
        </div>

        {isAuthenticated ? (
          <div className="user">
            <Link to="/create-page">Add Fruit</Link>
            <Link to="/user/logout">Logout</Link>
          </div>
        ) : (
          <div className="guest">
            <Link to="/user/login">Login</Link>
            <Link to="/user/register">Register</Link>

          </div>
        )}
      </nav>
    </header>

  )
}