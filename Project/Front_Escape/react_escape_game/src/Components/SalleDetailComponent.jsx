import React from 'react';
import '../Styles/App.css'
import '../Styles/DetailStyle.css'

const SalleDetailComponent = ({ salleDetails }) => {

    return (
        <div className='Detail-Bord'>
            <div className='Detail-Card'>
                <div className="Detail-images">
                    <img className='Pola' src={salleDetails.photo1} alt='Photo 1' />
                    <img className='Pola' src={salleDetails.photo2} alt='Photo 2' />
                    <img className='Pola' src={salleDetails.photo3} alt='Photo 3' />
                </div>
                <div className='Detail-Texte'>
                    <h1 className='titre'>{salleDetails.titre}</h1>
                    <p>{salleDetails.synopsis}</p>
                    <p>{salleDetails.objectif}</p>
                    <p> tarif : {salleDetails.prix} €</p>
                    <p> durée : 1 h 30 </p>
                </div>
            </div>
        </div>
    );
};

export default SalleDetailComponent;
