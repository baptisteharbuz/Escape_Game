import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/EnigmeStyle.css';

const JeuxMysterePage = ({ sendVoucherToPanierPage }) => {
    const [inputValue, setInputValue] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const cursor = document.querySelector('.cursor');

        if (cursor) {
            const handleMouseMove = (e) => {
                cursor.style.left = e.clientX - 150 + 'px';
                cursor.style.top = e.clientY - 150 + 'px';
            };

            window.addEventListener('mousemove', handleMouseMove);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        } else {
            console.error('Le sélecteur .cursor n\'a pas été trouvé.');
        }
    }, []);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setShowErrorMessage(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.toLowerCase() === 'enigme') {
            setIsCorrect(true);
        } else {
            setShowErrorMessage(true);
        }
    };

    useEffect(() => {
        if (isCorrect) {
            navigate('/panier');
            if (typeof sendVoucherToPanierPage === 'function') {
                sendVoucherToPanierPage(isCorrect);
            }
        }
    }, [isCorrect, navigate, sendVoucherToPanierPage]);

    return (
        <div className='accueil-container'>
            <div className='cursor'></div>
            <div className='input-container'>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        value={inputValue}
                        onChange={handleInputChange}
                        className='input-txt'
                    />
                    <br />
                    <button type='submit'>Vérifier</button>
                </form>
                {showErrorMessage && (
                    <h2>{inputValue} n'est pas la bonne réponse</h2>
                )}
                {isCorrect && (
                    <p>
                        Bravo ! Vous avez résolu notre jeu mystère. Bénéficiez à présent
                        d'une réduction de 15%.
                    </p>
                )}
            </div>
        </div>
    );
};

export default JeuxMysterePage;
