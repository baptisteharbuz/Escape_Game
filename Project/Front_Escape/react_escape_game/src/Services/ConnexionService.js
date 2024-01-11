import axios from 'axios';

function fetchUtilisateur() {
  return axios.get("http://127.0.0.1:3000/utilisateur");
}

function fetchUtilisateurById(id_utilisateur) {
  return axios.get(`http://127.0.0.1:3000/utilisateur/${id_utilisateur}`);
}

function addUtilisateur(utilisateur) {
  return axios.post("http://127.0.0.1:3000/utilisateur", utilisateur, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function login(utilisateur) {
    return axios.post("http://127.0.0.1:3000/utilisateur/login",utilisateur, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function logout() {
    return axios.post("http://127.0.0.1:3000/utilisateur/logout")
      .then(response => response.data)
      .catch(error => {
        console.error('Erreur lors de la déconnexion', error);
        throw error;
      });
  }


export default {
  fetchUtilisateur,
  fetchUtilisateurById,
  addUtilisateur,
  login,
  logout
};