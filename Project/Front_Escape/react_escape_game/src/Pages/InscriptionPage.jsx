import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConnexionService from '../Services/ConnexionService';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import '../Styles/ConnexionStyle.css';
import '../Styles/App.css';
import AuthContext from '../Context/AuthContext';
import { toast } from 'react-toastify';
import { getToken, getUser } from '../Services/LocalStorage';

const Register = () => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const [utilisateur, setUtilisateur] = useState({
    nom: "",
    prenom: "",
    email: "",
    mdp: "",
  });
  const navigate = useNavigate();


  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setUtilisateur({ ...utilisateur, [name]: value });
  };

  const handleAdd = async (event) => {
    event.preventDefault();

    // Validation du mot de passe
    const passwordRequire = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]|.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!passwordRequire.test(utilisateur.mdp)) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
      return;
    }

    try {
      const response = await ConnexionService.register(utilisateur);

      if (response && response.success) {
        setIsAuthenticated(true);
        setUser({ ...utilisateur, id: response.data.id });

        navigate(`/profil`);
        toast.success("Compte créé avec succès !");
      } else {
        // Gestion des erreurs avec codes HTTP
        if (response.status === 400) {
          console.log(setUser + "setUser")
          console.log(...utilisateur + "...utilisateur")
          console.log(response + "response")
          toast.error("Le mot de passe est invalide.");
        } else if (response.status === 409) {
          toast.error("L'adresse e-mail est déjà utilisée par un autre compte.");
        } else {
          toast.error("Une erreur est survenue lors de la création du compte.");
        }
      }
    } catch (e) {
      console.error('Erreur lors de la création de compte', e);
      toast.error("Une erreur est survenue lors de la création du compte.");
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
      setUser(getUser());
    }
  }, []);


  return (
    <div>
      <div className='Carte-Connection'>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Card className='Card' style={{ width: '30rem' }}>
            <Card.Body style={{ backgroundcolor: 'rgb(228, 228, 228' }}>
              <Form onSubmit={handleAdd}>
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

export default Register;