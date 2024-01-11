const conn = require("./database");

const fetchSalleById = (id) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM Salle WHERE id_salle = ${id};`;
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
    fetchSalleById
};
