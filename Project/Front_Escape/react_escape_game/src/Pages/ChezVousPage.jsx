import React, { useEffect, useState } from 'react';
import SalleService from '../Services/SalleService';
import SalleComponent from '../Components/SalleComponent';
import '../Styles/App.css'

const SalleList = () => {
    const [salles, setSalles] = useState([]);

    const fetchSalle = async () => {
        try {
            const response = await SalleService.GetSalleChezVous();
            setSalles(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchSalle();
    }, []);

    return <>
        <div className='titre'>
            <h1>CHEZ VOUS</h1>
        </div>
        {salles.map((salle, id) => {
            return <SalleComponent key={id} salle={salle} />;
        })}

    </>;


};

export default SalleList;
