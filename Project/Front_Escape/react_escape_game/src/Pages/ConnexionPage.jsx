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
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setUtilisateur({ ...utilisateur, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await ConnexionService.login(utilisateur);
      console.log(response);
      if (response.status === 200) {
        setIsAuthenticated(true)
        setUser(response.data)
        navigate(`/panier`);
      }
    } catch (error) {
      console.error('Échec de la connexion', error);
    }
  };

  return (
    <div>
      <div className='Carte-Connection'>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Card className='Card' style={{ width: '30rem' }}>
            <Card.Body className='Card' style={{ backgroundcolor: 'rgb(228, 228, 228' }}>
              <Form>
                <h1 style={{ textAlign: 'center' }}>Connexion</h1>
                <Form.Group className="mb-3" controlId="ConnexionEmail">
                  <Form.Label className='txt-conn'>Email :</Form.Label>
                  <Form.Control type="text" name="email" value={utilisateur.email} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicConnexionPassword">
                  <Form.Label className='txt-conn'>Mot de passe :</Form.Label>
                  <Form.Control type="password" name="mdp" value={utilisateur.mdp} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                </Form.Group>
                <div className="button-add" style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button type="button" onClick={handleLogin} style={{ marginRight: '10px' }}>
                    Se connecter
                  </Button>
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