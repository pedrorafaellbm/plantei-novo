import Contato from '../models/Contato.js';

export async function criarContato(req, res) {
  try {
    const { nome, email, mensagem } = req.body;

    if (!nome || !email || !mensagem) {
      return res.status(400).json({ erro: 'Campos obrigatórios' });
    }

    const contato = await Contato.create({
      nome,
      email,
      mensagem,
    });

    return res.status(201).json(contato);
  } catch (error) {
    console.error('Erro ao criar contato:', error);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}