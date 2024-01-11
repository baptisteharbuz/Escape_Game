const conn = require("./database");

const fetchSallePhoto = (id) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM Salle`;
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
    fetchSallePhoto
};