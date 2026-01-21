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
        }catch (err) {
            return res.status(400).json({ erro: err.message });
        }
    },

    async Login
}