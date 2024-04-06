import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import '../Styles/HeaderStyle.css';

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <ul>
        <img src="https://cdn.discordapp.com/attachments/1151134832043229215/1182615313196527636/logo-removebg-preview.png?ex=662239d6&is=660fc4d6&hm=4f4a10b37b46348beed71578f84f7a4ff40ef2648e30a2faf2b872fa93a95987&" alt="Logo Escape Game" />
        <li><Link to='/accueil'>Accueil</Link></li>
        <div className="dropdown">
          <button className="dropbtn">Nos Services</button>
          <div className="dropdown-content">
            <Link to="/chezvous">Chez Vous</Link>
            <Link to="/cheznous">Chez nous</Link>
          </div>
        </div>
        <li><Link to="/jeuxmystere">Jeux-Mystère</Link></li>
        <li><Link to="/photo">Photo</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="user-links">
        <Link to="/panier">Panier</Link>

        {/*Si connecté*/}
        {isAuthenticated ? (
          <div className="dropdown">
            <Link to="/profil">Profil</Link>
          </div>
        ) : (
          <div className="dropdown">
            <button className="dropbtn">Connectez-vous</button>
            <div className="dropdown-content" >
              <Link to="/connexion">Connexion</Link>
              <Link to="/inscription">Inscription</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
