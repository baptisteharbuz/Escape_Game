import axios from 'axios';

function GetPanier(id_utilisateur) {
    return axios.get(`${process.env.REACT_APP_API_URL}/panier/` + id_utilisateur);
}

function SubmitReservation(reservationData) {
    return axios.post(`${process.env.REACT_APP_API_URL}/panier`, reservationData);
}

function GetSalleByReservation(reservationData) {
    return axios.get(`${process.env.REACT_APP_API_URL}/salle`, reservationData);
}

function DeletePanier(id_salle) {
    return axios.delete(`${process.env.REACT_APP_API_URL}/panier/` + id_salle);
}

function GetTotal(id_utilisateur) {
    return axios.get(`${process.env.REACT_APP_API_URL}/panier/total/` + id_utilisateur);
}
export default {
    GetPanier,
    SubmitReservation,
    GetSalleByReservation,
    DeletePanier,
    GetTotal
}