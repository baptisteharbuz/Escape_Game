const express = require("express");
const router = express.Router();
const chezVousService = require("../Services/chezVousService");

router.get("/", async (req, res) => {
    try {
        const salle = await chezVousService.fetchSalleChezVous();
        res.status(200).json(salle);
    } catch (err) {
        console.error("Oops...", err);
        res.status(500).json({ "message": "Error" + err.sqlMessage });
    }
});

module.exports = router;