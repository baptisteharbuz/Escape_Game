import { Link } from 'react-router-dom';
import React from 'react';
import '../Styles/App.css'
import '../Styles/Style.css'
import '../Styles/TextStyle.css'


const Accueil = () => {
  return (
    <div className="accueil">
      <div className='img-accueil'>
        <video autoPlay loop muted className="fullscreen-video">
          <source src="/videos/Vidéo_bg2.mp4" type="video/mp4"></source>
        </video>
        <div className='TXT-titre'>
          <h1 className='enigmes'>ÉNIGMES</h1>
          <h1 className='evadees'>ÉVADÉES</h1>
        </div>
      </div>
      <br />
      <br />
      <div className="cardsAccueil">

        {/* Chez nous */}
        <Link to='/cheznous'>
          <div className="card-nous card-hover">
            <h1 className='enigmes'>CHEZ</h1>
            <h1 className='evadees'>NOUS</h1>
          </div>
        </Link>

        {/* Chez vous */}
        <Link to='/chezvous'>
          <div className="card-vous card-hover">
            <h1 className='enigmes'>CHEZ</h1>
            <h1 className='evadees'>VOUS</h1>
          </div>
        </Link>

      </div>
      <br />
      <br />
      <div className='Propos-Div'>
        {/* À propos de nous */}
        <div className="about-us">
          <h2 className='titre'>À propos de nous</h2><br />
          <p>
            "Énigmes Évadées" a été créée avec une passion commune pour les défis intellectuels et les
            aventures captivantes. Notre équipe dévouée travaille sans relâche pour concevoir des Escape Games
            originaux, stimulants et divertissants qui transportent les participants dans des univers
            extraordinaires.
          </p><br />
        </div>

        {/* Proposez-nous vos projets */}
        <div className="propose">
          <h2>Proposez-nous vos projets</h2><br />
          <textarea style={{ resize: 'none' }} type="text" className="form-control" placeholder="Ecrivez-nous ici !" /><br />
          <button type="submit">Envoyer</button>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Accueil;