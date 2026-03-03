import 'dotenv/config';
import bcrypt from 'bcrypt';
import { sequelize } from '../config/database.js';
import { Usuario } from '../models/Usuario.js';

async function main() {
  const senhaHash = await bcrypt.hash('Admin@123', 10);
  const email = 'admin@vidaverde.com';

  const existente = await Usuario.findOne({ where: { email } });

  if (existente) {
    await existente.update({
      nome: 'Administrador',
      senhaHash,
      role: 'admin',
      cpf: '00000000000',
    });
    return;
  }

  await Usuario.create({
    nome: 'Administrador',
    email,
    senhaHash,
    role: 'admin',
    cpf: '00000000000',
  });
}

main()
  .then(async () => {
    await sequelize.close();
  })
  .catch(async (error) => {
    console.error(error);
    await sequelize.close();
    process.exit(1);
  });
