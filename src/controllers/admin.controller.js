import { listarUsuarios, atualizarRoleUsuario } from '../services/admin.service.js';
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
};
