import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import 'src/models/Produto.js';
import 'src/models/Contato.js';
import { sequelize } from './config/database.js';
import { Produto } from './models/Produto.js';
import { Contato } from 'src/models/Contato.js';

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('API Plantei funcionando 🚀');
});

app.get('/produtos', async (_, res) => {
  res.json(await Produto.findAll());
});

app.post('/produto', async (req, res) => {
  res.status(201).json(await Produto.create(req.body));
});

app.get('/contatos', async (_, res) => {
  res.json(await Contato.findAll());
});

app.post('/contato', async (req, res) => {
  res.status(201).json(await Contato.create(req.body));
});

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () =>
      console.log(`🚀 API rodando na porta ${PORT}`)
    );
  } catch (err) {
    console.error('❌ ERRO CRÍTICO:', err);
  }
})();
