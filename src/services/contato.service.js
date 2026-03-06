import { Contato } from '../models/Contato.js';
import { z } from 'zod';

const contatoSchema = z.object({
  nome: z.string().trim().min(1, 'Nome obrigatorio'),
  email: z.string().trim().email('Email obrigatorio'),
  mensagem: z.string().trim().min(1, 'Mensagem obrigatoria'),
});

class ContatoService {
  listar() {
    return Contato.findAll();
  }

  buscarPorId(id) {
    return Contato.findByPk(id);
  }

  criar(payload) {
    const parsed = contatoSchema.parse(payload);
    return Contato.create(parsed);
  }

  async atualizar(id, payload) {
    const contato = await Contato.findByPk(id);
    if (!contato) return null;

    await contato.update(payload);
    return contato;
  }

  async remover(id) {
    const contato = await Contato.findByPk(id);
    if (!contato) return null;

    await contato.destroy();
    return true;
  }
}

export default new ContatoService();
