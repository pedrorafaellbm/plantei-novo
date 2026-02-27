import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.js';
import { Usuario } from '../models/Usuario.js';
import { gerarHash, compararHash } from '../utils/hash.js';

// Salva um novo usuario no banco de dados, encriptando a senha e retorna o usuario criado
export const registrarUsuario = async (payload) => {
  const nome = payload?.nome ?? payload?.name;
  const email = payload?.email;
  const senha = payload?.senha ?? payload?.password;
  const cpf = payload?.cpf ?? payload?.documento ?? payload?.document;

  if (!nome || !email || !senha || !cpf) {
    throw new Error('Campos obrigatorios: nome, email, senha e cpf');
  }

  const normalizedNome = String(nome).trim();
  const normalizedEmail = String(email).trim().toLowerCase();
  const normalizedCpf = String(cpf).replace(/\D/g, '');

  if (normalizedCpf.length !== 11) throw new Error('CPF invalido');

  const existenteEmail = await Usuario.findOne({ where: { email: normalizedEmail } });
  if (existenteEmail) throw new Error('Email ja cadastrado');

  const existenteCpf = await Usuario.findOne({ where: { cpf: normalizedCpf } });
  if (existenteCpf) throw new Error('CPF ja cadastrado');

  const senhaHash = await gerarHash(senha);

  return Usuario.create({
    nome: normalizedNome,
    email: normalizedEmail,
    senha: senhaHash,
    cpf: normalizedCpf,
  });
};

export const autenticarUsuario = async ({ email, senha }) => {
  // Buscar usuario pelo email, apenas um usuario ja deve existir apenas um por email
  const usuario = await Usuario.findOne({ where: { email } });

  // Se nao encontrar ou a senha for invalida, lanca erro
  if (!usuario) throw new Error('Usuario ou senha invalidos');

  // Verificar se a senha bate com o que foi informado no campo do login
  const senhaValida = await compararHash(senha, usuario.senha);

  // Se a senha nao for valida, lanca erro
  if (!senhaValida) throw new Error('Usuario ou senha invalidos');

  // Gerar um token JWT para o usuario autenticado
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );

  return { token, usuario };
};
