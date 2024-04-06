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
        <a href="https://fr.dreamstime.com/photos-stock-poule-image13549723" target="_blank">
          <img src="https://cdn.discordapp.com/attachments/1151134832043229215/1182615313196527636/logo-removebg-preview.png?ex=65855756&is=6572e256&hm=c1266d72963b709654cb2801c868298ce709ef5a3911ece323ffcb84413196f0&" alt="Logo Poule" href="https://fr.dreamstime.com/photos-stock-poule-image13549723" target="_blank" /></a>
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
