const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
  

app.get("/", (req, res) => {
  res.send("HELLO!"); // super
});

app.use("/accueil", accueil);


app.listen(port, () => {
  console.log(`Application exemple à l'écoute sur le port http://127.0.0.1:${port}/ !`);
  console.log(`Route utilisateur : http://127.0.0.1:${port}/utilisateur !`);
});
