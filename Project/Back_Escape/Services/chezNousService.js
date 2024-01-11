const conn = require("./database");

const fetchSalleChezNous = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM Salle WHERE is_chez_vous = false`;
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
    fetchSalleChezNous
};