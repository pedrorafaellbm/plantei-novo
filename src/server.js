import 'dotenv/config';
import app from './app.js';
import { sequelize } from './config/database.js';
import './models/Usuario.js';
import './models/Contato.js';
import './models/produto.js';
import './models/Favorito.js';
import './models/Favorite.js';
import './models/Address.js';
import './models/Category.js';
import './models/Banner.js';
import './models/Contact.js';
import './models/StoreInfo.js';

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
      categoria VARCHAR(60) NOT NULL DEFAULT 'Plantas',
      "createdAt" TIMESTAMP DEFAULT NOW(),
      "updatedAt" TIMESTAMP DEFAULT NOW()
    );
  `);
  await sequelize.query(`
    ALTER TABLE produtos
    ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;
  `);
  await sequelize.query(`
    ALTER TABLE produtos
    ADD COLUMN IF NOT EXISTS categoria VARCHAR(60);
  `);
  await sequelize.query(`
    ALTER TABLE produtos
    ADD COLUMN IF NOT EXISTS category_id INTEGER;
  `);
  await sequelize.query(`
    ALTER TABLE produtos
    ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false;
  `);
  await sequelize.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'produtos_category_id_fkey'
      ) THEN
        ALTER TABLE produtos
        ADD CONSTRAINT produtos_category_id_fkey
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;
      END IF;
    EXCEPTION WHEN undefined_table THEN
      NULL;
    END $$;
  `);
  await sequelize.query(`
    UPDATE produtos
    SET categoria = 'Plantas'
    WHERE categoria IS NULL OR categoria = '';
  `);
  await sequelize.query(`
    ALTER TABLE produtos
    ALTER COLUMN categoria SET DEFAULT 'Plantas';
  `);
  await sequelize.query(`
    ALTER TABLE produtos
    ALTER COLUMN categoria SET NOT NULL;
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
    CREATE TABLE IF NOT EXISTS favorites (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
      product_id INTEGER NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(user_id, product_id)
    );
  `);
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS addresses (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
      name VARCHAR(150) NOT NULL,
      cep VARCHAR(20) NOT NULL,
      state VARCHAR(80) NOT NULL,
      city VARCHAR(120) NOT NULL,
      district VARCHAR(120) NOT NULL,
      street VARCHAR(180) NOT NULL,
      number VARCHAR(30) NOT NULL,
      complement VARCHAR(180),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL UNIQUE,
      description TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  await sequelize.query(`
    ALTER TABLE categories
    ADD COLUMN IF NOT EXISTS description TEXT;
  `);
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS banners (
      id SERIAL PRIMARY KEY,
      title VARCHAR(160) NOT NULL,
      description TEXT,
      image_url TEXT NOT NULL,
      link TEXT,
      button_text VARCHAR(120),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  await sequelize.query(`
    ALTER TABLE banners
    ADD COLUMN IF NOT EXISTS button_text VARCHAR(120);
  `);
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      email VARCHAR(150) NOT NULL,
      message VARCHAR(500) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS store_info (
      id SERIAL PRIMARY KEY,
      title VARCHAR(160) NOT NULL DEFAULT 'Sobre a Loja',
      description TEXT,
      mission TEXT,
      quality TEXT,
      delivery TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
  `);
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS store_info_cards (
      id SERIAL PRIMARY KEY,
      store_info_id INTEGER NOT NULL REFERENCES store_info(id) ON DELETE CASCADE,
      title VARCHAR(120) NOT NULL,
      body TEXT NOT NULL,
      position INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);
  await sequelize.query(`
    ALTER TABLE "User"
    ADD COLUMN IF NOT EXISTS avatar_url TEXT;
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
  await sequelize.query(`
    INSERT INTO categories (name, description)
    VALUES
      ('Plantas', 'Categoria padrao da loja'),
      ('Vasos', 'Vasos decorativos e utilitarios'),
      ('Sementes', 'Sementes para cultivo'),
      ('Fertilizantes', 'Adubos e fertilizantes')
    ON CONFLICT (name) DO NOTHING;
  `);
  await sequelize.query(`
    INSERT INTO store_info (title, description, mission, quality, delivery)
    SELECT
      'Sobre a Loja',
      'Somos uma loja dedicada ao cultivo e venda de plantas de qualidade, com foco em praticidade, curadoria e atendimento humano.',
      'Conectar pessoas a natureza com produtos selecionados, informacao clara e uma compra simples.',
      'Cada item e escolhido para garantir boa adaptacao, visual bonito e excelente apresentacao.',
      'Despacho rapido, embalagens seguras e acompanhamento atencioso para cada pedido.'
    WHERE NOT EXISTS (SELECT 1 FROM store_info);
  `);
  await sequelize.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE constraint_name = 'produtos_category_id_fkey'
      ) THEN
        ALTER TABLE produtos
        ADD CONSTRAINT produtos_category_id_fkey
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;
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
