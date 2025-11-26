import express from 'express';

const HOST = '127.0.0.1'
const PORT = '5000'

const app = express();

// middlewares
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API de Produtos funcionando 🚀');
    
})



try {
  await sequelize.authenticate();
  console.log('🟢 Conectado ao banco de dados!');
} catch (err) {
  console.error('🔴 Erro ao conectar no banco:', err);
}

// iniciando o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});