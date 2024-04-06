const conn = require("./database");

const fetchUtilisateur = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT id_utilisateur, email, mdp FROM utilisateur;`;
        let query = conn.query(sql, (err, result, field) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

const fetchUtilisateurByID = (id) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT id_utilisateur, email, mdp FROM utilisateur WHERE id_utilisateur = ?;`;
        conn.query(sql, [id], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]);
        });
    });
};

// CONNEXION
const login = (user) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM utilisateur WHERE email = ?`;
        const query = conn.query(sql, [user.email], (err, result, field) => {
            // Gestion des erreurs
            if (err) return reject(err);
            resolve(result);
        });
    });
}

// INSCRIPTION
const register = (newUser) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO utilisateur (nom, prenom, email, mdp) VALUES (?, ?, ?, ?)`;
        const query = conn.query(sql, [newUser.nom, newUser.prenom, newUser.email, newUser.mdp], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// SUPPRESSION
const deleteUtilisateur = async (id) => {
    const sqlPanier = `DELETE FROM panier WHERE id_utilisateur = ?`;
    await conn.query(sqlPanier, [id]);
    const sqlUtilisateur = `DELETE FROM utilisateur WHERE id_utilisateur = ?`;
    const result = await conn.query(sqlUtilisateur, [id]);
    if (result.affectedRows === 0) {
        throw new Error('Utilisateur non trouvé.');
    }
};

// MODIFICATIONS
const modificationProfil = async (id, utilisateur) => {
    try {
        const sql = `UPDATE Utilisateur SET nom = ?, prenom = ?, email = ? WHERE id_utilisateur = ?`;
        const result = await conn.query(sql, [utilisateur.nom, utilisateur.prenom, utilisateur.email, id]);

        if (!result.affectedRows || result.affectedRows === 0) {
            throw new Error('Aucune modification effectuée : utilisateur non trouvé.');
        }
        return { message: "Profil utilisateur mis à jour avec succès", affectedRows: result.affectedRows };
    } catch (error) {
        console.error('Erreur lors de la modification de l’utilisateur', error);
        throw error; // Propager l'erreur pour gestion ultérieure
    }
};


const modificationMotDePasse = async (id, nouveauMotDePasse) => {
    const sql = `UPDATE utilisateur SET mdp = ? WHERE id_utilisateur = ?`;
    const result = await conn.query(sql, [nouveauMotDePasse, id]);
    // Gestion des erreurs
    if (!result) {
        throw new Error('Utilisateur non trouvé ou une erreur est survenue lors de la modification du mot de passe.');
    }
    return result.values;
};

module.exports = {
    fetchUtilisateur,
    fetchUtilisateurByID,
    register,
    login,
    deleteUtilisateur,
    modificationProfil,
    modificationMotDePasse
}