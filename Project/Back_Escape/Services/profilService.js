const conn = require("./database");

const fetchPanier = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM Panier`;
        let query = conn.query(sql, (err, result, field) => {
            if (err) {
                console.error("Error executing SQL:", err);
                return reject(err);
            }
            resolve(result);
        });
    });
};

const fetchPanierById = (id) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT *
        FROM Salle
        INNER JOIN Panier ON Salle.id_salle = Panier.id_salle
        WHERE Panier.id_utilisateur = ${id};`;
        let query = conn.query(sql, (err, result, field) => {
            if (err) {
                console.error("Error executing SQL:", err);
                return reject(err);
            }
            resolve(result);
        });
    });
};

const addPanierById = (panier) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO Panier (id_utilisateur, id_salle, date_reservation, duree, id_salarie, nombre_participant)
        VALUES (${panier.id_utilisateur}, ${panier.id_salle}, "${panier.date_reservation}", "${panier.duree}", ${panier.id_salarie}, ${panier.nombre_participant})`;
        let query = conn.query(sql, (err, result, field) => {
            if (err) {
                console.error("Error executing SQL:", err);
                return reject(err);
            }
            resolve(result);
        });
    });
};

const deletePanier = (id) => {
    return new Promise((resolve, reject) => {
      let sql = `DELETE FROM Panier WHERE id_panier = ${id};`;
      let query = conn.query(sql, (err, result, field) => {
        if (err) {
          console.error("Error executing SQL:", err);
          return reject(err);
        }
        resolve(result);
      });
    });
  };

  const fetchPrixTotalById = (id) => {
    return new Promise((resolve, reject) => {
        let sql = `  SELECT SUM(s.Prix) AS TotalPrix
        FROM Panier p
        JOIN Salle s ON p.id_salle = s.id_salle
        WHERE p.id_utilisateur = ${id};`;
        let query = conn.query(sql, (err, result, field) => {
            if (err) {
                console.error("Error executing SQL:", err);
                return reject(err);
            }
            resolve(result);
        });
    });
};

module.exports = {
    fetchPanier,
    fetchPanierById,
    addPanierById,
    deletePanier,
    fetchPrixTotalById
};