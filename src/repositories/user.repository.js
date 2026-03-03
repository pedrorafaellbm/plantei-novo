import { Usuario } from '../models/Usuario.js';

export const findByEmail = (email) =>
  Usuario.findOne({
    where: { email },
  });

export const findByCpf = (cpf) =>
  Usuario.findOne({
    where: { cpf },
  });

export const findById = (id) =>
  Usuario.findByPk(id);

export const create = (data) =>
  Usuario.create(data);
