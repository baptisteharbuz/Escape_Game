import React from 'react';
import '..\src\Styles\HeaderStyle.css'






const Navbar = () => {
    return (
        <nav class="navbar">
        <ul>
          <li><a href="#">Accueil</a></li>
          <li><a href="#">Jeux-Mystère</a></li>
          <li><a href="#">Photo</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">profil</a></li>
          <li><a href="#">Connection</a></li>
        </ul>
      </nav>
    )
}

export default Navbar;