import express from 'express';

// IMPORTAR MODELS AQUI
import './models/produto.js';
import { sequelize } from './config/database.js';
import { Produto } from './models/produto.js';

const HOST = '127.0.0.1'
const PORT = '5000'

const app = express();

// middlewares
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API de Produtos funcionando 🚀');
    
});

// buscar produtos

app.get('/produtos', async (req, res) => {
  const produtos = await Produto.findAll();
  try {
    res.status(201).json({
      mensagem: "Sucesso ao  trazer os produtos!",
      size: produtos.lenghth,
      data: produtos,
    });
} catch (err) {
    console.error(err);

    // erros de validação do Sequelize
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        erro: err.errors.map(e => e.message),
      });
    }

    return res.status(500).json({ erro: "Erro ao buscar o produto" });
  }
});

// crir um produto
app.post('/produto', async (req, res) => {
  try {
    // payload é o produto que vem do request, através do body
    const payload = req.body;

    const produto = await Produto.create(payload);

    return res.status(201).json({
      mensagem: "Produto criado com sucesso!",
      data: produto,
    });
  } catch (err) {
    console.error(err);

    // erros de validação do Sequelize
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        erro: err.errors.map(e => e.message),
      });
    }

    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }

});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("🎉 Conectado ao Postgres Neon com sucesso!");

    await sequelize.sync({ alter: true });
    console.log("📦 Modelos sincronizados com o banco!");

    app.listen(PORT, () =>
      console.log(`🚀 Servidor rodando na porta http://${HOST}:${PORT}`)
    );
  } catch (err) {
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1);
  }
}

startServer();

