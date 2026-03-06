import { listarUsuarios, atualizarRoleUsuario, removerUsuario } from '../services/admin.service.js';
import { log } from '../utils/logger.js';

export default {
  async listarUsuarios(req, res, next) {
    try {
      const usuarios = await listarUsuarios();
      return res.status(200).json({ data: usuarios, size: usuarios.length });
    } catch (err) {
      log.error(err);
      return next(err);
    }
  },

  async atualizarRole(req, res, next) {
    try {
      const usuario = await atualizarRoleUsuario(req.params.id, req.body);
      if (!usuario) return res.status(404).json({ error: 'Usuario nao encontrado' });
      return res.status(200).json({
        data: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          role: usuario.role,
        },
      });
    } catch (err) {
      log.error(err);
      return next(err);
    }
  },

  async removerUsuario(req, res, next) {
    try {
      const result = await removerUsuario(req.user.id, req.params.id);

      if (result.status === 'self_delete_blocked') {
        return res.status(400).json({ error: 'Voce nao pode excluir a propria conta' });
      }

      if (result.status === 'not_found') {
        return res.status(404).json({ error: 'Usuario nao encontrado' });
      }

      return res.status(200).json({ message: 'Usuario excluido com sucesso' });
    } catch (err) {
      log.error(err);
      return next(err);
    }
  },
};
