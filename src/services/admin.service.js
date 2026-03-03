import { z } from 'zod';
import { Usuario } from '../models/Usuario.js';

const roleSchema = z.object({
  role: z.enum(['customer', 'admin']),
});

export const listarUsuarios = async () => {
  return Usuario.findAll({
    attributes: ['id', 'nome', 'email', 'cpf', 'role', 'createdAt', 'updatedAt'],
    order: [['createdAt', 'DESC']],
  });
};

export const atualizarRoleUsuario = async (id, payload) => {
  const { role } = roleSchema.parse(payload);
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;
  await usuario.update({ role });
  return usuario;
};
