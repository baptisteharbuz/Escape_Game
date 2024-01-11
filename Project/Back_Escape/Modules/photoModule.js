const express = require("express");
const router = express.Router();
const fetchSallePhoto = require("../Services/photoService");

router.get("/", async (req, res) => {
    try {
        const salle = await photoService.fetchSallePhoto();
        res.status(200).json(salle);
    } catch (err) {
        console.error("Oops...", err);
        res.status(500).json({ "message": "Error" + err.sqlMessage });
    }
});

module.exports = router;