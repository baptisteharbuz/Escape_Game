const express = require("express");
const router = express.Router();
const salleDetailService = require("../Services/salleDetailService");

router.get("/:id_salle", async (req, res) => {
    salleDetailService.fetchSalleById(req.params.id_salle).then(result => {
        res.status(200)
        res.json(result[0]);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({"message" : "Error" + err.sqlMessage})
    });
});

module.exports = router;