import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/SalleStyle.css';
import { Carousel } from 'flowbite-react';
import SalleService from '../Services/SalleService';

const Salle = ({ salle }) => {
  const [salledetail, setSalledetail] = useState([]);

  useEffect(() => {
    const fetchSalleDetail = async () => {
      try {
        const response = await SalleService.GetSalleById();
        setSalledetail(response.data.results);
      } catch (e) {
        console.log(e);
      }
    };

    fetchSalleDetail();
  }, []);

  return <>
    <div className='Card-Salle'>
      <Link to={`/salle/${salle.id_salle}`}>
        <div className='Card-Border' href={`/salle/${salle.id_salle}`}>
          <div className="Card-Car">
            <Carousel>
              <img className='Pola' src={salle.photo1} alt='Photo 1' />
              <img className='Pola' src={salle.photo2} alt='Photo 2' />
              <img className='Pola' src={salle.photo3} alt='Photo 3' />
            </Carousel>
          </div>
          <div className='Card-Texte'>
            <h1>{salle.titre}</h1>
            <br />
            <h2>Synopsis</h2>
            <br />
            <p>{salle.synopsis}</p>
            <br />
            <h2>Objectif</h2>
            <br />
            <p>{salle.objectif}</p>
            <br />
            <Link to={`/salle/${salle.id_salle}`}><button>Plus d'info</button></Link>
          </div>
        </div>
      </Link>
    </div>
  </>;
};

export default Salle;