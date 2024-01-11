import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/SalleStyle.css';
import { Carousel } from 'flowbite-react';
import PanierService from '../Services/PanierService';
import Moment from 'react-moment';
import 'moment/locale/fr';

const Salle = ({ salle, fetchPanier }) => {

  const handleSuppression = async () => {
    try {
      await PanierService.DeletePanier(salle.id_panier);
      fetchPanier();
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
    }
  };

  return (
    <div className='Card-Salle'>
      <div className='Card-Border'>
        <div className="Card-Cart">
          <Carousel>
            <img className='Pola' src={salle.photo1} alt='Photo 1' />
            <img className='Pola' src={salle.photo2} alt='Photo 2' />
            <img className='Pola' src={salle.photo3} alt='Photo 3' />
          </Carousel>
        </div>
        <div className='Card-Texte'>
          <h1>{salle.titre}</h1>
          <br />
          <p> durée : 1 h 30 </p>
          <p> tarif : {salle.prix} €</p>
          <p>Date de réservation : <Moment format="LLLL" locale="fr">{salle.date_reservation}</Moment></p>
          <p> Nombre de Participants : {salle.nombre_participant} </p>
          <br />
          <div className='Card-Button'>
            <Link to={`/salle/${salle.id_salle}`}><button>Plus d'info</button></Link>
            <button onClick={handleSuppression}>Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salle;
