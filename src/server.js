import express from 'express';
import cors from 'cors';
import './models/produto.js';
import './models/Categoria.js';
import './models/Marca.js';
import './models/Contato.js';
import { sequelize } from './config/database.js';
import produtosRoutes from './routes/produto.routes.js';
import categoriaRoutes from './routes/categoria.routes.js';
import marcaRoutes from './routes/marca.routes.js';
import contatoRoutes from './routes/contato.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rota raiz
app.get('/', (req, res) => {
  res.send('API Vida Verde funcionando 🚀');
});

// Rotas
app.use('/produtos', produtosRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/marcas', marcaRoutes);
app.use('/contatos', contatoRoutes);

// Porta e host (Render fornece a porta, host deve ser 0.0.0.0)
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Conectar ao banco e subir o servidor
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("🎉 Conectado ao Postgres Neon com sucesso!");

    await sequelize.sync({ alter: true });
    console.log("📦 Modelos sincronizados com o banco!");

    app.listen(PORT, HOST, () =>
      console.log(`🚀 Servidor rodando em http://${HOST}:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Erro ao iniciar o servidor:", err);
  }
};

startServer();