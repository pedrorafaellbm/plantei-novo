import * as authService from '../services/auth.service.js';

export default {
  async register(req, res) {
    try {
      const usuario = await authService.registrarUsuario(req.body);

      return res.status(201).json({
        mensagem: 'Usuário criado com sucesso',
        id: usuario.id,
        email: usuario.email,
      });
    } catch (err) {
      if (err?.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ erro: 'Email ou CPF ja cadastrado' });
      }
      if (err?.name === 'SequelizeValidationError') {
        return res.status(400).json({ erro: err.errors?.[0]?.message || 'Dados invalidos' });
      }
      return res.status(400).json({ erro: err.message });
    }
  },

  async login(req, res) {
    try {
      console.log('Requisição de login recebida:', req.body);
      
      const { token, usuario } = await authService.autenticarUsuario(req.body);

      return res.json({
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
        },
      });
    } catch (err) {
      return res.status(401).json({ erro: err.message });
    }
  },

  async logout(req, res) {
    // JWT simples → logout no frontend
    return res.json({ mensagem: 'Logout realizado' });
  },
};
