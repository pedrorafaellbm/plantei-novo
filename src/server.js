import express from 'express';
import cors from 'cors';

// IMPORTAR MODELS
import './models/Produto.js';
import './models/Contato.js';

import { sequelize } from './config/database.js';

// IMPORTAR ROTAS
import produtosRoutes from './routes/produto.routes.js';
import contatoRoutes from './routes/contato.routes.js';

const HOST = process.env.HOST;
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

// ROTA RAIZ
app.get('/', (req, res) => {
    res.send('API Vida Verde funcionando 🚀');
});

// ROTAS
app.use('/produtos', produtosRoutes);
app.use('/contatos', contatoRoutes);

try {
    await sequelize.authenticate();
    console.log("🎉 Conectado ao Postgres Neon com sucesso!");

    // SINCRONIZAR MODELS
    await sequelize.sync({ alter: true });
    console.log("📦 Modelos sincronizados com o banco!");

    app.listen(PORT, () =>
        console.log(`🚀 Servidor rodando em http://${HOST}:${PORT}`)
    );
} catch (err) {
    console.error("❌ Erro ao iniciar o servidor:", err);
}