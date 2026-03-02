import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import * as userRepository from '../repositories/user.repository.js';
import HttpError from '../utils/http-error.js';

const registerSchema = z.object({
  nome: z.string().trim().min(1),
  email: z.string().trim().email(),
  senha: z.string().min(6),
  cpf: z.string().trim().min(11),
});

const loginSchema = z.object({
  email: z.string().trim().email(),
  senha: z.string().min(1),
});

export const registrarUsuario = async (payload) => {
  const parsed = registerSchema.parse(payload);
  const nome = parsed.nome.trim();
  const email = parsed.email.toLowerCase();
  const cpf = parsed.cpf.replace(/\D/g, '');

  if (cpf.length !== 11) {
    throw new HttpError(400, 'CPF invalido');
  }

  const existenteEmail = await userRepository.findByEmail(email);
  if (existenteEmail) {
    throw new HttpError(409, 'Email ja cadastrado');
  }

  const existenteCpf = await userRepository.findByCpf(cpf);
  if (existenteCpf) {
    throw new HttpError(409, 'CPF ja cadastrado');
  }

  const senhaHash = await bcrypt.hash(parsed.senha, 10);

  return userRepository.create({
    nome,
    email,
    cpf,
    senhaHash,
    role: 'customer',
  });
};

export const autenticarUsuario = async (payload) => {
  const parsed = loginSchema.parse(payload);
  const email = parsed.email.toLowerCase();

  const usuario = await userRepository.findByEmail(email);
  if (!usuario) {
    throw new HttpError(401, 'Usuario ou senha invalidos');
  }

  const senhaValida = await bcrypt.compare(parsed.senha, usuario.senhaHash);
  if (!senhaValida) {
    throw new HttpError(401, 'Usuario ou senha invalidos');
  }

  const token = jwt.sign(
    { sub: usuario.id, role: usuario.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token, usuario };
};

export const buscarUsuarioAutenticado = async (userId) => {
  const usuario = await userRepository.findById(userId);
  if (!usuario) {
    throw new HttpError(404, 'Usuario nao encontrado');
  }
  return usuario;
};
