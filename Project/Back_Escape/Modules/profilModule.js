const express = require("express");
const router = express.Router();
const profilService = require("../Services/profilService");


router.get("/:id_utilisateur", async (req, res) => {
    profilService.fetchPanierById(req.params.id_utilisateur).then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({ "message": "Error" + err.sqlMessage })
    });
});

router.get("/", async (req, res) => {
    profilService.fetchPanier(req.params.id_utilisateur).then(result => {
        res.status(200)
        res.json(result);
    }).catch(err => {
        console.error("Oops...", err);
        res.json({ "message": "Error" + err.sqlMessage })
    });
});

router.post("/", async (req, res) => {
    console.log(req.body);
    try {
        const result = await profilService.addPanierById(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.error("Oops...", err);
        res.status(500).json({ "message": "Error" + err.sqlMessage });
    }
});


router.delete("/:id_panier", async (req, res) => {
    console.log(req.params.id_panier);
    try {
      const result = await profilService.deletePanier(req.params.id_panier);
      res.status(200).json(result);
    } catch (err) {
      console.error("Oops...", err);
      res.status(500).json({ "message": "Error" + err.sqlMessage });
    }
  });

  router.get("/total/:id_utilisateur", async (req, res) => {
    try {
        const result = await profilService.fetchPrixTotalById(req.params.id_utilisateur);
        res.status(200).json(result);
    } catch (err) {
        console.error("Oops...", err);
        res.status(500).json({ message: "Error: " + err.sqlMessage });
    }
});

module.exports = router;
