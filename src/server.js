import 'dotenv/config';
import app from './app.js';
import { sequelize } from './config/database.js';
import './models/Usuario.js';
import './models/Contato.js';
import './models/produto.js';
import './models/Favorito.js';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  await sequelize.authenticate();
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS produtos (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(150) NOT NULL,
      descricao TEXT,
      preco DECIMAL(10,2),
      estoque INT,
      "imageUrl" TEXT,
      "createdAt" TIMESTAMP DEFAULT NOW(),
      "updatedAt" TIMESTAMP DEFAULT NOW()
    );
  `);
  await sequelize.query(`
    ALTER TABLE produtos
    ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;
  `);
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS favoritos (
      id SERIAL PRIMARY KEY,
      usuario_id TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
      produto_id INTEGER NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(usuario_id, produto_id)
    );
  `);
  await sequelize.query(`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'produtos' AND column_name = 'image_url'
      ) THEN
        UPDATE produtos
        SET "imageUrl" = image_url
        WHERE "imageUrl" IS NULL AND image_url IS NOT NULL;
      END IF;
    END $$;
  `);
  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error('Falha ao iniciar servidor:', error);
  process.exit(1);
});
