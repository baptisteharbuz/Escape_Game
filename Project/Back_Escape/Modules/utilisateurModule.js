require('dotenv').config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const jwtSecret = process.env.SECRET;
const utilisateurService = require("../Services/utilisateurService");
const { checkTokenMiddleware } = require('../Services/middleware');

// INSCRIPTION
router.post('/register', (req, res) => {
    const user = req.body;
    // Vérification préalable pour s'assurer que l'utilisateur n'existe pas déjà
    utilisateurService.login({ email: user.email }).then(existingUsers => {
        if (existingUsers.length > 0) {
            // Si l'utilisateur existe déjà, renvoyez un message d'erreur
            res.status(409).json({ message: "L'adresse email est déjà utilisée par un autre compte." });
            return;
        }
        // Hachage du mot de passe
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.log(err);
                res.status(500).send({ "message": "Erreur lors de la génération du sel pour le mot de passe." });
                return;
            }
            bcrypt.hash(user.mdp, salt, (err, hashedPassword) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ "message": "Erreur lors du hachage du mot de passe." });
                    return;
                }
                // Création de l'utilisateur avec le mot de passe haché
                const newUser = {
                    nom: user.nom,
                    prenom: user.prenom,
                    email: user.email,
                    mdp: hashedPassword
                };
                // Appel de la fonction d'register définie dans votre service
                utilisateurService.register(newUser)
                    .then((result) => {
                        res.status(201).json({ message: "Utilisateur créé avec succès", userId: result.insertId });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json({ message: "Une erreur s'est produite lors de la création de l'utilisateur" });
                    });
            });
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Une erreur s'est produite lors de la vérification de l'existence de l'utilisateur" });
    });
});

// CONNEXION
router.post('/login', (req, res, next) => {
    const user = req.body;
    if (!user.email || !user.mdp) {
        return res.status(400).json({ message: "Veuillez renseigner un email et un mot de passe" });
    }
    // Recherche de l'utilisateur dans la base de données par son email
    utilisateurService.login(user)
        .then((result) => {
            if (result.length > 0) {
                // Comparaison du mot de passe fourni avec le mot de passe haché stocké dans la base de données
                const hashedPassword = result[0].mdp;
                bcrypt.compare(user.mdp, hashedPassword, (err, passwordMatch) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ "message": "Erreur lors de la comparaison des mots de passe." });
                        return;
                    }
                    if (passwordMatch) {
                        // Si les mots de passe correspondent, génération d'un token JWT
                        const token = jwt.sign({
                            user: result[0]
                        }, jwtSecret, { expiresIn: '3 hours' });
                        res.json({
                            access_token: token,
                            user: result[0],
                            isLoggedIn: true
                        });
                        res.status(200)
                    } else {
                        // Si les mots de passe ne correspondent pas
                        res.status(401).json({ message: "Mot de passe incorrect" });
                    }
                });
            } else {
                // Si aucun utilisateur correspondant n'est trouvé, renvoyez un message d'erreur
                res.status(404).json({ message: "Utilisateur non trouvé" });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Une erreur s'est produite lors de la recherche de l'utilisateur" });
        });
});


router.get("/:utilisateur", async (req, res) => {
    try {
        const result = await utilisateurService.fetchUtilisateurByID(req.params.utilisateur);
        if (!result) {
            return res.status(404).json({ "message": "Utilisateur non trouvé" });
        }
        res.status(200).json(result);
    } catch (err) {
        console.error("Oops...", err);
        res.status(500).json({ "message": "Error " + err.sqlMessage });
    }
});


router.get("/", async (req, res) => {
    try {
        const result = await utilisateurService.fetchUtilisateur();
        res.status(200).json(result);
    } catch (err) {
        console.error("Oops...", err);
        res.status(500).json({ "message": "Error" + err.sqlMessage });
    }
});

// router.use(checkTokenMiddleware);


// SUPPRESSION
router.delete("/:id_utilisateur", async (req, res) => {
    try {
        console.log(req.params)
        const result = await utilisateurService.deleteUtilisateur(req.params.id_utilisateur);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Une erreur est survenue" });
    }
});

// MODIFICATIONS (Profil)
router.put("/modification/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { motDePasseActuel, ...userUpdates } = req.body;
        console.log(req.body)
        const utilisateurActuel = await utilisateurService.fetchUtilisateurByID(id);
        if (!utilisateurActuel) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        const motDePasseValide = await bcrypt.compare(motDePasseActuel, utilisateurActuel.mdp);
        if (!motDePasseValide) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }
        await utilisateurService.modificationProfil(id, userUpdates);
        return res.status(200).json({ message: "Profil utilisateur mis à jour avec succès" });
    } catch (err) {
        console.error("Erreur lors de la mise à jour du profil :", err);
        return res.status(500).json({ message: "Une erreur est survenue" });
    }
});




router.put("/changerMotDePasse/:id", async (req, res) => {
    const { id } = req.params;
    const { nouveauMotDePasse } = req.body;
    if (!nouveauMotDePasse) {
        return res.status(400).json({ message: "Veuillez fournir un nouveau mot de passe" });
    }
    // Hachage du nouveau mot de passe avec la même logique que pour l'inscription
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.error("Erreur lors de la génération du sel", err);
            return res.status(500).json({ message: "Erreur lors de la génération du sel pour le mot de passe." });
        }
        bcrypt.hash(nouveauMotDePasse, salt, async (err, hashedPassword) => {
            if (err) {
                console.error("Erreur lors du hachage du mot de passe", err);
                return res.status(500).json({ message: "Erreur lors du hachage du mot de passe." });
            }
            // Mise à jour du mot de passe haché dans la base de données
            try {
                const result = await utilisateurService.modificationMotDePasse(id, hashedPassword);
                res.status(200).json({ message: "Mot de passe mis à jour avec succès", result });
            } catch (err) {
                console.error("Erreur lors de la mise à jour du mot de passe", err);
                res.status(500).json({ message: "Une erreur est survenue" });
            }
        });
    });
});


module.exports = router;