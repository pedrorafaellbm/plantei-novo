import 'dotenv/config';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const senhaHash = await bcrypt.hash('Admin@123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@vidaverde.com' },
    update: {
      nome: 'Administrador',
      senhaHash,
      role: 'admin',
      cpf: '00000000000',
    },
    create: {
      nome: 'Administrador',
      email: 'admin@vidaverde.com',
      senhaHash,
      role: 'admin',
      cpf: '00000000000',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
