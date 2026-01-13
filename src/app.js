const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const contatoRoutes = require("./routes/contato.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contatos", contatoRoutes);

sequelize.sync()
  .then(() => console.log("Banco conectado e tabelas criadas"))
  .catch(err => console.error(err));

module.exports = app;
