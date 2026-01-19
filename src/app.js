import express from 'express';
import cors from 'cors';
import { sequelize } from './config/database.js';
import contatoRoutes from './routes/contato.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/contatos', contatoRoutes);

sequelize.sync()
  .then(() => console.log("Banco conectado e tabelas criadas"))
  .catch(err => console.error(err));

export default app;