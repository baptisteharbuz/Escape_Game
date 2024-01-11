import React, { useEffect, useState } from 'react';
import '../Styles/SalleStyle.css';
import SalleService from '../Services/SalleService';


const PhotoVous = ({ salle }) => {
  const [salledetail, setSalledetail] = useState([]);

  useEffect(() => {
    const fetchSalleDetail = async () => {
      try {
        const response = await SalleService.GetSalleChezVous();
        setSalledetail(response.data.results);
      } catch (e) {
        console.log(e);
      }
    };

    fetchSalleDetail();
  }, []);



  return <>
    <div className='Card-Photo'>
      <div>
        <img className='Pola' src={salle.photo1} alt='Photo 1' />
        <img className='Pola' src={salle.photo2} alt='Photo 2' />
        <img className='Pola' src={salle.photo3} alt='Photo 3' />
      </div>
    </div>
  </>;
};

export default PhotoVous;