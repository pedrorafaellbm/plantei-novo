import app from './app.js';
import { sequelize } from './config/database.js';

const HOST = '127.0.0.1';
const PORT = 3000;

// INICIAR SERVIDOR + BANCO
try {
  await sequelize.authenticate();
  console.log("🎉 Conectado ao Postgres Neon com sucesso!");

  await sequelize.sync({ alter: true });
  console.log("📦 Modelos sincronizados com o banco!");

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://${HOST}:${PORT}`);
  });

} catch (err) {
  console.error("💥 Erro ao iniciar o servidor:", err);
}

// Buscar usuário por ID
app.get('/usuario/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      console.log(`❌ Usuário ID ${id} não encontrado`);
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    console.log(`🔎 Usuário ID ${id} encontrado`);
    res.status(200).json({
      mensagem: "Usuário encontrado com sucesso!",
      data: usuario,
    });

  } catch (err) {
    console.error("💥 Erro ao buscar usuário por ID:", err);
    res.status(500).json({ erro: "Erro ao buscar usuário" });
  }
});