import express from 'express';
import cors from 'cors';
import 'dotenv/config';


import { sequelize } from './config/database.js';
import contatoRoutes from './routes/contato.routes.js';
import produtoRoutes from './routes/produto.routes.js';

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('API Plantei funcionando 🚀');
});

app.use('/produtos', produtoRoutes);
app.use('/contatos', contatoRoutes);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Banco conectado');

    await sequelize.sync();
    console.log('📦 Tabelas sincronizadas');

    app.listen(PORT, () =>
      console.log(`🚀 API rodando na porta ${PORT}`)
    );
  } catch (err) {
    console.error('❌ ERRO CRÍTICO:', err);
  }
})();
