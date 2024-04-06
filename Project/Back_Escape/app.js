require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT;
// Modules
const cheznous = require("./Modules/chezNousModule");
const chezvous = require("./Modules/chezVousModule");
const salle = require("./Modules/salleDetailsModule");
const utilisateur = require("./Modules/utilisateurModule");
const panier = require("./Modules/profilModule");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Bienvenue chez Escape Game");
});

app.use("/cheznous", cheznous);
app.use("/chezvous", chezvous);
app.use("/salle", salle);
app.use("/utilisateur", utilisateur);
app.use("/panier", panier)

app.listen(port, () => {
  console.log(`Application exemple à l'écoute sur le port http://127.0.0.1:${port}/ !`);
});
