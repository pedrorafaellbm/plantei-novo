import express from 'express';

// IMPORTAR MODELS AQUI
import './models/produto.js';
import { sequelize } from './config/database.js';
import produtosRoutes from './routes/produto.routes.js';
import categoriaRoutes from './routes/categoria.routes.js';
import marcaRoutes from './routes/marca.routes.js';

const HOST = process.env.HOST
const PORT = process.env.PORT 

const app = express();

app.use(express.json());
app.use('/produtos', produtosRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/marcas', marcaRoutes);

try {
    await sequelize.authenticate();
    console.log("🎉 Conectado ao Postgres Neon com sucesso!");

    // CRIAR TABELAS AUTOMATICAMENTE
    await sequelize.sync({ alter: true }); // ou { force: true } se quiser recriar
    console.log("📦 Modelos sincronizados com o banco!");

    app.listen(PORT, () =>
        console.log(`🚀 Servidor rodando em http://${HOST}:${PORT}`)
    );
} catch (err) {
    console.error("Erro ao iniciar o servidor:", err);
}

