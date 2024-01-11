import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ConnexionService from '../Services/ConnexionService';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import '../Styles/ConnexionStyle.css';
import '../Styles/App.css';
import AuthContext from '../Context/AuthContext';


const Login = () => {
  const [utilisateur, setUtilisateur] = useState({
    email: '',
    mdp: '',
  });
  const navigate = useNavigate();
  const {setIsAuthenticated, setUser} = useContext(AuthContext);

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setUtilisateur({ ...utilisateur, [name]: value });
  };

  const handleAdd = async () => {
    try {
      const response = await ConnexionService.addUtilisateur(utilisateur);
      console.log(response);
      navigate(`/panier/${response.data}`);
    } catch (e) {
      console.error('Erreur lors de la création de compte', e);
    }
  };

  return (
    <div>
        <div className='Carte-Connection'>
    <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card className='Card' style={{ width: '30rem' }}>
        <Card.Body  style={{ backgroundcolor: 'rgb(228, 228, 228' }}>
          <Form>
            <h1 style={{ textAlign: 'center' }}>Inscription</h1>
            <Form.Group className="mb-4" controlId="formBasicNom">
              <Form.Label className='txt-conn'>Nom :</Form.Label>
              <Form.Control type="text" name="nom" value={utilisateur.nom} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPrenom">
              <Form.Label className='txt-conn'>Prénom :</Form.Label>
              <Form.Control type="text" name="prenom" value={utilisateur.prenom} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicCheckbox">
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicAdresse">
              <Form.Label className='txt-conn'>Adresse :</Form.Label>
              <Form.Control type="text" name="adresse" value={utilisateur.adresse} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicTel">
              <Form.Label className='txt-conn'>Téléphonne :</Form.Label>
              <Form.Control type="text" name="tel" value={utilisateur.tel} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicInscriptionEmail">
              <Form.Label className='txt-conn'>Email :</Form.Label>
              <Form.Control type="mail" name="email" value={utilisateur.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicInscriptionPassword">
              <Form.Label className='txt-conn'>Mot de Passe :</Form.Label>
              <Form.Control type="password" name="mdp" value={utilisateur.mdp} onChange={handleChange} />
            </Form.Group>
            <div className="button-add" style={{ display: 'flex', justifyContent: 'center' }}>
              <button type="button" onClick={handleAdd}>
                Créer un compte
              </button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  </div>
    </div>
  );
};

export default Login;