import React from 'react';

const Accueil = () => {
  return (
    <div className="accueil">
        <div className="cardsAccueil">
      {/* Chez nous */}
      <div className="card">
        <h2>Chez nous</h2>
        <button onClick={() => window.location.href = "/nouvelle-page"}>Cliquez ici</button>
      </div>

      {/* Chez vous */}
      <div className="card">
        <h2>Chez vous</h2>
        <button onClick={() => window.location.href = "/autre-page"}>Cliquez ici</button>
      </div>
      </div>

      {/* À propos de nous */}
      <div className="about-us">
        <h2>À propos de nous</h2>
        <p>Votre texte ici...</p>
      </div>

      {/* Proposez-nous vos projets */}
      <div className="propose">
        <h2>Proposez-nous vos projets</h2>
        <p>Votre texte ici...</p>
      </div>
    </div>
  );
};

export default Accueil;