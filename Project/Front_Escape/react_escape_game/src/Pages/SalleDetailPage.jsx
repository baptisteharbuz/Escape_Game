import React, { useEffect, useState, useContext } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useParams, useNavigate } from 'react-router-dom';
import SalleService from '../Services/SalleService';
import SalleDetailComponent from '../Components/SalleDetailComponent';
import PanierService from '../Services/PanierService';
import AuthContext from '../Context/AuthContext';
import { format } from 'date-fns';
import '../Styles/TextStyle.css';

const SalleDetail = () => {
    const { salle_id } = useParams();
    const [salleDetails, setSalleDetails] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const { user, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const getSalleDetailById = async () => {
        try {
            const response = await SalleService.GetSalleById(salle_id);
            setSalleDetails(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getSalleDetailById();
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const selectedHour = date.getHours();
        console.log("Heure sélectionnée:", selectedHour);
    };

    const handleNumberOfPeopleChange = (e) => {
        setNumberOfPeople(e.target.value);
    };

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0;
    };

    const handleReservationSubmit = async () => {
        try {
            const formattedDate = format(selectedDate, "yyyy-MM-dd HH:mm:ss");
console.log(formattedDate);
            const reservationData = {
                id_utilisateur: user.id_utilisateur,
                id_salle: salle_id,
                date_reservation: formattedDate,
                duree: "01:30:00",
                id_salarie: 1,
                nombre_participant: numberOfPeople,
            };

            const response = await PanierService.SubmitReservation(reservationData);
            console.log('Réponse du serveur:', response.data);
            navigate('/panier');
        } catch (error) {
            console.error(`Erreur lors de la réservation`, error);
        }
    };

    return (
        <>
            <div className='Card-Detail'>
                <SalleDetailComponent salleDetails={salleDetails} />

                {isAuthenticated ? (
                <div className='Res-Card'>
                    <h3>Choisissez une date et une heure :</h3>
                    <DatePicker
                    className='datepicker'
                        selected={selectedDate}
                        onChange={handleDateChange}
                        showTimeSelect
                        timeIntervals={30}
                        dateFormat="Pp"
                        filterDate={isWeekday}
                        excludeTimes={[
                            new Date().setHours(23, 0),
                            new Date().setHours(11, 0),
                            new Date().setHours(11, 30),
                            new Date().setHours(12, 0),
                            new Date().setHours(12, 30),
                            new Date().setHours(13, 0),
                            new Date().setHours(13, 30),
                        ]}
                        minTime={new Date().setHours(9, 0)}
                        maxTime={new Date().setHours(23, 0)}
                    />
                    <br />
                    <h3>Nombre de personnes :</h3>
                    <input className='people' type="number" value={numberOfPeople} onChange={handleNumberOfPeopleChange} min="2" max="6" />
                    <br />
                    <button onClick={handleReservationSubmit}>Réserver</button>
                </div>
                            ) : (
                                <div className='Txt-SalleDetail'>
                                <h2>CONNECTEZ-VOUS POUR RESERVER</h2>
                                </div>
                              )}
            </div>
        </>
    );
};

export default SalleDetail;
