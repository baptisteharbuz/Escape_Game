import axios from 'axios';

function GetSalleChezNous() {
    return axios.get("http://127.0.0.1:3000/cheznous")
}

function GetSalleChezVous() {
    return axios.get("http://127.0.0.1:3000/chezvous")
}

function GetSalleById(id_salle) {
    return axios.get("http://127.0.0.1:3000/salle/" + id_salle)
}

export default {
    GetSalleChezNous,
    GetSalleChezVous,
    GetSalleById
}