import React, { useEffect, useState } from 'react';
import SalleService from '../Services/SalleService';
import PhotoComponent from '../Components/PhotoComponent';
import '../Styles/App.css'

const SalleList = () => {
    const [vous, setVous] = useState([]);
    const [nous, setNous] = useState([]);

    const fetchVous = async () => {
        try {
            const response = await SalleService.GetSalleChezVous();
            setVous(response.data);
        } catch (e) {
            console.log(e);
        }
    };
    const fetchNous = async () => {
        try {
            const response = await SalleService.GetSalleChezNous();
            setNous(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchVous();
        fetchNous();
    }, []);

    return <>
    <div className='Total-Container-Photo'>
        <div className='titre'>
            <h1>NOS PHOTOS</h1>
        </div>
        <br />
        {vous.map((salle, id) => {
            return <PhotoComponent key={id} salle={salle} />;
        })}
        {nous.map((salle, id) => {
            return <PhotoComponent key={id} salle={salle} />;
        })}
        </div>
    </>;
};

export default SalleList;
