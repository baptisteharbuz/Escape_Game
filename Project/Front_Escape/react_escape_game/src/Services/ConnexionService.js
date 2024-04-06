import axios from '../Services/AxiosConfig';
const API_URL = process.env.REACT_APP_API_URL;

function fetchUtilisateur() {
  return axios.get(`${API_URL}utilisateur`);
}

function fetchUtilisateurById(id_utilisateur) {
  return axios.get(`${API_URL}utilisateur/${id_utilisateur}`);
}

const login = async (utilisateur) => {
  try {
    const response = await axios.post(`${API_URL}/utilisateur/login`, utilisateur);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la connexion', error);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('token');
  return axios.post(`${API_URL}/utilisateur/logout`);
};

const register = async (utilisateur) => {
  try {
    const response = await axios.post(`${API_URL}/utilisateur/register`, utilisateur);
    return { data: response.data, error: null };
  } catch (error) {
    console.error('Erreur lors de l’ajout d’un utilisateur', error);
    return { data: null, error: error.response };
  }
};

const deleteUtilisateur = async (id_utilisateur) => {
  try {
    const response = await axios.delete(`${API_URL}/utilisateur/${id_utilisateur}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la suppression de l’utilisateur', error);
    throw error;
  }
};

const modifierUtilisateur = async (id_utilisateur, userData) => {
  try {
    const response = await axios.put(`${API_URL}/utilisateur/modification/${id_utilisateur}`, userData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la modification de l’utilisateur', error);
    throw error;
  }
};

const modifierMotDePasse = async (id_utilisateur, nouveauMotDePasse) => {
  try {
    const response = await axios.put(`${API_URL}/utilisateur/changerMotDePasse/${id_utilisateur}`, {
      nouveauMotDePasse
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la modification du mot de passe', error);
    throw error;
  }
};

export default {
  fetchUtilisateur,
  fetchUtilisateurById,
  login,
  register,
  logout,
  deleteUtilisateur,
  modifierUtilisateur,
  modifierMotDePasse
};