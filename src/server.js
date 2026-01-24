import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// carregar variáveis de ambiente
dotenv.config()

// IMPORTAR MODELS
import './models/Produto.js'
import './models/Categoria.js'
import './models/Marca.js'
import './models/Contato.js'

// DATABASE
import { sequelize } from './config/database.js'

// IMPORTAR ROTAS
import produtosRoutes from './routes/produto.routes.js'
import categoriaRoutes from './routes/categoria.routes.js'
import marcaRoutes from './routes/marca.routes.js'
import contatoRoutes from './routes/contato.routes.js'

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 3000

const app = express()

// MIDDLEWARES
app.use(cors())
app.use(express.json())

// ROTA RAIZ
app.get('/', (req, res) => {
  res.send('API Vida Verde funcionando 🚀')
})

// ROTAS DA API
app.use('/produtos', produtosRoutes)
app.use('/categorias', categoriaRoutes)
app.use('/marcas', marcaRoutes)
app.use('/contato', contatoRoutes) // 👈 CONTATO (SINGULAR)

// INICIAR SERVIDOR + BANCO
try {
  await sequelize.authenticate()
  console.log('🎉 Conectado ao Postgres Neon com sucesso!')

  await sequelize.sync({ alter: true })
  console.log('📦 Modelos sincronizados com o banco!')

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://${HOST}:${PORT}`)
  })
} catch (error) {
  console.error('❌ Erro ao iniciar o servidor:', error)
}