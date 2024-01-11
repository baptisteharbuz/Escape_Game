import React, { useEffect, useState } from 'react';
import '../Styles/SalleStyle.css';
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
    <div className='Container-Photo'>
      <div className='Border-Photo'>
        <div className="Card-Photo">
          <img className='PhotoPage' src={salle.photo1} alt='Photo 1' />
          <img className='PhotoPage' src={salle.photo2} alt='Photo 2' />
          <img className='PhotoPage' src={salle.photo3} alt='Photo 3' />
        </div>
      </div>
    </div>
  </>;
};

export default Salle;