const express = require("express");
const router = express.Router();
const chezNousService = require("../Services/chezNousService");

// Toute les routes de ce fichier vont commencer par cheznous

router.get("/", async (req, res) => {
    try {
        const salle = await chezNousService.fetchSalleChezNous();
        res.status(200).json(salle);
    } catch (err) {
        console.error("Oops...", err);
        res.status(500).json({ "message": "Error" + err.sqlMessage });
    }
});


module.exports = router;