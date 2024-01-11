import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PanierService from '../Services/PanierService';
import PanierComponent from '../Components/PanierComponent';
import AuthContext from '../Context/AuthContext';
import '../Styles/Style.css';
import '../Styles/App.css';

const Panier = () => {
  const [reservations, setReservations] = useState([]);
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isCorrect = new URLSearchParams(location.search).get('correct') === 'true';

  const getReservations = async () => {
    try {
      const response = await PanierService.GetPanier(user.id_utilisateur);
      console.log(response);
      setReservations(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const applyVoucher = () => {
    const reservationsWithDiscount = reservations.map((reservation) => ({
      ...reservation,
      total: reservation.total * 0.85,
    }));

    setReservations(reservationsWithDiscount);
  };

  useEffect(() => {
    getReservations();
  }, []);

  // const calculateTotal = () => {
  //   let total = 0;
  //   reservations.forEach((reservation) => {
  //     total += Number(reservation.total) || 0;
  //   });
  //   return total;
  // };

  useEffect(() => {
    if (isCorrect) {
      console.log('Réponse correcte !');
    }
  }, [isCorrect]);

  return (
    <>
      <div className='Container-Panier'>
        <div className='titre'>
          <h1>PANIER</h1>
        </div>
        <div className='Card-Detail'>
          {isAuthenticated ? (
            <>
              {reservations.map((reservation, id) => (
                <div key={id}>
                  <PanierComponent
                    salle={reservation}
                    fetchPanier={() => getReservations()}
                  />
                </div>
              ))}
              {isCorrect ? (
                <div className='Message-Correct'>
                  <p>Vous avez gagné un bon de réduction de 15% !</p>
                </div>
              ) : (
                <div className='Message-Incorrect'>
                    <p>Jouez et tentez de remporter une réduction de 15% !</p>
                  <br />
                  {/* <p>Total du panier : {calculateTotal()} €</p> */}
                </div>
              )}
            </>
          ) : (
            <h1>PANIER VIDE</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Panier;