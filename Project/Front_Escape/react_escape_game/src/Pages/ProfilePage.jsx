import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { toast } from "react-toastify";
import ConnexionService from "../Services/ConnexionService";
// Styles
import "../Styles/ProfilStyle.css";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
// Components
import Confirmation from "../Components/ConfirmationComponent";
import VerifyPasswordModal from "../Components/PasswordVerificationComponent";
import ChangePasswordModal from "../Components/ChangePasswordComponent";

const Profil = () => {
    const { setIsAuthenticated, user, setUser } = useContext(AuthContext);
    const [utilisateur, setUtilisateur] = useState({ ...user, actualPassword: "" });
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showPasswordVerification, setShowPasswordVerification] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [nom, setNom] = useState(user.nom || "");
    const [prenom, setPrenom] = useState(user.prenom || "");
    const [email, setEmail] = useState(user.email || "");

    // const handleChange = (event) => {
    //     const { name, value } = event.currentTarget;
    //     if (name === "nom") setNom(value);
    //     else if (name === "prenom") setPrenom(value);
    //     else if (name === "email") setEmail(value);
    //     else setUtilisateur(prevState => ({ ...prevState, [name]: value }));
    // };
    const handleChange = (event) => {
        const { name, value } = event.currentTarget;
        setUtilisateur(prevState => ({ ...prevState, [name]: value }));
    };

    const handleModification = async (e) => {
        e.preventDefault();
        if (utilisateur.actualPassword === '') {
            toast.error("Veuillez entrer votre mot de passe actuel pour confirmer les modifications.");
            return;
        }
        // Préparation de userData avec les champs spécifiques à modifier
        const userData = {
            nom: utilisateur.nom,
            prenom: utilisateur.prenom,
            email: utilisateur.email,
        };

        try {
            // Appel à la fonction de service avec l'ID utilisateur, userData, et actualPassword
            // À ajuster en fonction de la signature exacte de votre fonction de service
            await ConnexionService.modifierUtilisateur(user.id_utilisateur, userData, utilisateur.actualPassword);
            toast.success("Votre profil a bien été modifié.");

            // Mise à jour de l'utilisateur dans le contexte/authentification locale
            // Notez que cela ne mettra à jour que nom, prenom, et email dans le contexte local
            // et ne concerne pas le mot de passe ou d'autres champs non inclus dans userData
            setUser(prevUser => ({ ...prevUser, ...userData }));
        } catch (error) {
            // Gestion des erreurs basée sur le statut de la réponse, etc.
            const message = error.response?.status === 401
                ? "Votre session a expiré. Veuillez vous reconnecter."
                : `Erreur lors de la modification de votre profil: ${error.message}`;
            toast.error(message);
        }
    };


    const handleDeconnexion = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        navigate("/connexion");
    };

    const handleSuppression = async () => {
        setShowConfirmation(true);
    };

    const confirmSuppression = async () => {
        try {
            await ConnexionService.deleteUtilisateur(user.id_utilisateur);
            console.log(user)
            toast.success(`${user.nom} Votre profil a bien été supprimé`);
            setIsAuthenticated(false);
            navigate("/accueil");
        } catch (error) {
            toast.error("Erreur lors de la suppression du profil.");
        }
    };

    const handlePasswordChange = async (nouveauMotDePasse) => {
        try {
            await ConnexionService.modifierMotDePasse(user.id_utilisateur, nouveauMotDePasse);
            toast.success("Mot de passe changé avec succès.");
            setShowChangePasswordModal(false);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error("Votre session a expiré. Veuillez vous reconnecter.");
            } else {
                toast.error(`Erreur lors du changement de mot de passe: ${error.message}`);
            }
        }
    };
    useEffect(() => {
        setNom(user.nom);
        setPrenom(user.prenom);
        setEmail(user.email);
    }, [user]);

    return (
        <>
            <h1 className="bonjour-profil">Bonjour {user.prenom}</h1>
            <Card className='Card' style={{ width: '30rem' }}>
                <Card.Body style={{ backgroundColor: 'rgb(228, 228, 228)' }}>
                    <Form onSubmit={handleModification}>
                        <h1 style={{ textAlign: 'center' }}>Mon Profil</h1>
                        <Form.Group className="mb-4" controlId="formBasicNom">
                            <Form.Label className='txt-conn'>Nom :</Form.Label>
                            <Form.Control type="text" name="Nom" required onChange={(e) => setNom(e.target.value)} value={nom} />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPrenom">
                            <Form.Label className='txt-conn'>Prénom :</Form.Label>
                            <Form.Control type="text" name="Prenom" required onChange={(e) => setPrenom(e.target.value)} value={prenom} />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <Form.Label className='txt-conn'>Email :</Form.Label>
                            <Form.Control type="email" name="Mail" required onChange={(e) => setEmail(e.target.value)} value={email} />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label className='txt-conn'>Mot de Passe :</Form.Label>
                            <Form.Control type="password" name="actualPassword" placeholder="Mot de passe actuel" onChange={handleChange} value={utilisateur.actualPassword} />
                        </Form.Group>
                        <div className="button-add" style={{ display: 'flex', justifyContent: 'center' }}>
                            <button type="submit">Valider les changements</button>
                        </div>
                    </Form>
                </Card.Body>
                <button className="button-password-change" onClick={() => setShowPasswordVerification(true)}>Changer de mot de passe</button>
                <div className="button-profil">
                    <button onClick={handleDeconnexion}>Se déconnecter</button>
                    <button onClick={handleSuppression}>Supprimer mon compte</button>
                </div>
            </Card>
            <Confirmation isOpen={showConfirmation} onClose={() => setShowConfirmation(false)} onConfirm={confirmSuppression} user={user} />
            <VerifyPasswordModal isOpen={showPasswordVerification} onClose={() => setShowPasswordVerification(false)} onConfirm={() => setShowChangePasswordModal(true)} user={user} />
            <ChangePasswordModal isOpen={showChangePasswordModal} onClose={() => setShowChangePasswordModal(false)} onConfirm={handlePasswordChange} />
        </>
    );
};

export default Profil;









// import "../Styles/ProfilStyle.css";

// // Components
// import Confirmation from "../Components/ConfirmationComponent";
// import VerifyPasswordModal from "../Components/PasswordVerificationComponent";
// import ChangePasswordModal from "../Components/ChangePasswordComponent";

// const Profil = () => {
//     const [showConfirmation, setShowConfirmation] = useState(false);
//     const [showPasswordVerification, setShowPasswordVerification] = useState(false);
//     const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

//     const handleSuppression = async () => {
//         setShowConfirmation(true);
//     };

//     const confirmSuppression = async () => {
//         try {
//             await ConnexionService.deleteUtilisateur(user.id_utilisateur);
//             toast.success(`${user.nom} Votre profil a bien été supprimé`);
//             setIsAuthenticated(false);
//             navigate("/accueil");
//         } catch (error) {
//             toast.error("Erreur lors de la suppression du profil.");
//         }
//     };

//     const handlePasswordChange = async (nouveauMotDePasse) => {
//         try {
//             await ConnexionService.modifierMotDePasse(user.id_utilisateur, nouveauMotDePasse);
//             toast.success("Mot de passe changé avec succès.");
//             setShowChangePasswordModal(false);
//         } catch (error) {
//             if (error.response && error.response.status === 401) {
//                 toast.error("Votre session a expiré. Veuillez vous reconnecter.");
//             } else {
//                 toast.error(`Erreur lors du changement de mot de passe: ${error.message}`);
//             }
//         }
//     };
//     return (
//         <>
//             <Confirmation isOpen={showConfirmation} onClose={() => setShowConfirmation(false)} onConfirm={confirmSuppression} user={user} />
//             <VerifyPasswordModal isOpen={showPasswordVerification} onClose={() => setShowPasswordVerification(false)} onConfirm={() => setShowChangePasswordModal(true)} user={user} />
//             <ChangePasswordModal isOpen={showChangePasswordModal} onClose={() => setShowChangePasswordModal(false)} onConfirm={handlePasswordChange} />
//         </>
//     );
// };

// export default Profil;
