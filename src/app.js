import express from 'express';
import cors from 'cors';

// IMPORTAR MODELS
import './models/Produto.js';
import './models/Contato.js';

import { Produto } from './models/Produto.js';
import { Contato } from './models/Contato.js';

const app = express();

/* =======================
   CORS
======================= */

const allowedOrigins = [
  'http://localhost:3000',
];

app.use(cors({
  origin: (origin, callback) => {
    // permite Postman / curl
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

/* =======================
   ROTAS
======================= */

app.get('/', (req, res) => {
  res.send('API de Produtos funcionando 🚀');
});

/* ===== PRODUTOS ===== */

app.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.findAll();

    res.status(200).json({
      mensagem: "Sucesso ao trazer os produtos!",
      size: produtos.length,
      data: produtos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar produto" });
  }
});

app.get('/produto/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);

    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    res.json({
      mensagem: "Produto encontrado com sucesso!",
      data: produto,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro interno ao buscar produto" });
  }
});

app.post('/produto', async (req, res) => {
  try {
    const produto = await Produto.create(req.body);

    res.status(201).json({
      mensagem: "Produto criado com sucesso!",
      data: produto,
    });
  } catch (err) {
    console.error(err);

    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        erro: err.errors.map(e => e.message)
      });
    }

    res.status(500).json({ erro: "Erro ao criar produto" });
  }
});

app.post('/produtos/lote', async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({
        erro: "O corpo deve ser um array de produtos"
      });
    }

    const produtos = await Produto.bulkCreate(req.body, { validate: true });

    res.status(201).json({
      mensagem: "Produtos inseridos com sucesso!",
      quantidade: produtos.length,
      data: produtos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao inserir produtos" });
  }
});

app.put('/produto/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);

    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    await produto.update(req.body);

    res.json({
      mensagem: "Produto atualizado com sucesso!",
      data: produto,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao atualizar produto" });
  }
});

app.delete('/produto/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);

    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    await produto.destroy();

    res.json({ mensagem: "Produto deletado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao deletar produto" });
  }
});

/* ===== CONTATOS ===== */

app.get('/contatos', async (req, res) => {
  try {
    const contatos = await Contato.findAll();

    res.json({
      mensagem: "Sucesso ao trazer os contatos!",
      size: contatos.length,
      data: contatos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar contato" });
  }
});

app.get('/contato/:id', async (req, res) => {
  try {
    const contato = await Contato.findByPk(req.params.id);

    if (!contato) {
      return res.status(404).json({ erro: "Contato não encontrado" });
    }

    res.json({
      mensagem: "Contato encontrado com sucesso!",
      data: contato,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar contato" });
  }
});

app.post('/contato', async (req, res) => {
  try {
    const contato = await Contato.create(req.body);

    res.status(201).json({
      mensagem: "Contato criado com sucesso!",
      data: contato,
    });
  } catch (err) {
    console.error(err);

    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        erro: err.errors.map(e => e.message)
      });
    }

    res.status(500).json({ erro: "Erro ao criar contato" });
  }
});

export default app;


app.post('/usuario', async (req, res) => {
  try {
    const payload = req.body;

    const usuario = await Usuario.create(payload);

    res.status(201).json({
      mensagem: "Usuário criado com sucesso!",
      data: usuario,
    });

  } catch (err) {
    console.error("💥 Erro ao criar usuário:", err);

    // erro de validação do Sequelize
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        erro: err.errors.map(e => e.message)
      });
    }

    res.status(500).json({ erro: "Erro ao criar usuário" });
  }
});