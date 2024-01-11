const conn = require("./database");

const fetchUtilisateur = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT id_utilisateur, email, mdp FROM utilisateur;`;
        let query = conn.query(sql, (err, result, field) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

const fetchUtilisateurByID = (id) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT id_utilisateur, email, mdp FROM utilisateur WHERE id_utilisateur = ${id};`;
        let query = conn.query(sql, (err, result, field) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

const addUtilisateur = (utilisateur) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO utilisateur (nom, prenom, adresse, tel, email, mdp) VALUES ('${utilisateur.nom}','${utilisateur.prenom}','${utilisateur.adresse}','${utilisateur.tel}','${utilisateur.email}','${utilisateur.mdp}')`;
        let query = conn.query(sql, (err, result, field) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

const login = (email, mdp) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM utilisateur WHERE email = '${email}' AND mdp = '${mdp}';`;
        let query = conn.query(sql, (err, result, field) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    fetchUtilisateur,
    fetchUtilisateurByID,
    addUtilisateur,
    login
}