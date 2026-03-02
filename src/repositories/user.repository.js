import prisma from '../config/prisma.js';

export const findByEmail = (email) =>
  prisma.user.findUnique({
    where: { email },
  });

export const findByCpf = (cpf) =>
  prisma.user.findUnique({
    where: { cpf },
  });

export const findById = (id) =>
  prisma.user.findUnique({
    where: { id },
  });

export const create = (data) =>
  prisma.user.create({
    data,
  });
