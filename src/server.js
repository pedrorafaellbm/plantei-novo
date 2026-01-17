import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import './models/Produto.js';
import '/models/Contato.js';
import { sequelize } from './config/database.js';
import { Produto } from './models/Produto.js';
import { Contato } from '/models/Contato.js';

const app = express();

// ✅ PORTA DO RENDER
const PORT = process.env.PORT || 3000;

// 🔓 CORS LIBERADO (backend público)
app.use(cors());
app.use(express.json());

// ROTA RAIZ (ESSA É A QUE O RENDER TESTA)
app.get('/', (req, res) => {
  res.status(200).send('API Plantei funcionando 🚀');
});

//////////////////// PRODUTOS ////////////////////

app.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
});

app.get('/produto/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(produto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

app.post('/produto', async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar produto' });
  }
});

app.put('/produto/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
    await produto.update(req.body);
    res.json(produto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar produto' });
  }
});

app.delete('/produto/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
    await produto.destroy();
    res.json({ mensagem: 'Produto deletado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar produto' });
  }
});

//////////////////// CONTATOS ////////////////////

app.get('/contatos', async (req, res) => {
  try {
    const contatos = await Contato.findAll();
    res.json(contatos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar contatos' });
  }
});

app.post('/contato', async (req, res) => {
  try {
    const contato = await Contato.create(req.body);
    res.status(201).json(contato);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar contato' });
  }
});

//////////////////// START ////////////////////

try {
  await sequelize.authenticate();
  console.log('🎉 Banco conectado');

  await sequelize.sync();
  console.log('📦 Tabelas sincronizadas');

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });

} catch (err) {
  console.error('❌ Erro ao subir servidor:', err);
}