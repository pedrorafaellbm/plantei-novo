import * as authService from '../services/auth.service.js';

export default {
  async register(req, res) {
    const usuario = await authService.registrarUsuario(req.body);
    return res.status(201).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    });
  },

  async login(req, res) {
    const { token, usuario } = await authService.autenticarUsuario(req.body);
    return res.status(200).json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
      },
    });
  },

  async me(req, res) {
    const usuario = await authService.buscarUsuarioAutenticado(req.user.id);
    return res.status(200).json({
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
      },
    });
  },
};
