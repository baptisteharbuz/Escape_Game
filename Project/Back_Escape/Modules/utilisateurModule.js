const express = require("express");
const router = express.Router();
const utilisateurService = require("../Services/utilisateurService");

router.get("/", async (req, res) => {
    try {
        const result = await utilisateurService.fetchUtilisateur();
        res.status(200).json(result);
    } catch (err) {
        console.error("Oops...", err);
        res.status(500).json({ "message": "Error" + err.sqlMessage });
    }
});

router.get("/:utilisateur", async (req, res) => {
    try {
        const result = await utilisateurService.fetchUtilisateurByID(req.params.utilisateur);
        res.status(200).json(result[0]);
    } catch (err) {
        console.error("Oops...", err);
        res.status(500).json({ "message": "Error " + err.sqlMessage });
    }
});

router.post("/", async (req, res) => {
    try {
        const result = await utilisateurService.addUtilisateur(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.error("Oops...", err);
        res.status(500).json({ "message": "Error" + err.sqlMessage });
    }
});

router.post("/login", async (req, res) => {
    try {
        const data = req.body;
        if (!data.email || !data.mdp) {
            res.status(400).json({ "message": "Pseudo et mot de passe requis" });
            return;
        }
        const result = await utilisateurService.login(data.email, data.mdp);
        if (result && result.length > 0) {
            res.status(200);
            res.json(result[0])
        } else {
            res.status(401).json({ "message": "Échec de la connexion" });
        }
    } catch (err) {
        console.error("Oops...", err);
        res.status(500).json({ "message": "Error " + err.sqlMessage });
    }
});

module.exports = router;