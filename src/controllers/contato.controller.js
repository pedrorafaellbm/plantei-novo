import { Contato } from "../models/contato.js";

export default {
  async listar(req, res) {
    try {
      const contatos = await Contato.findAll();

      return res.status(200).json({
        mensagem: "Contatos retornados com sucesso!",
        size: contatos.length,
        data: contatos,
      });
    } catch (err) {
      log.error(err);
      return res.status(500).json({ erro: "Erro ao buscar contatos" });
    }console
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const contato = await Contato.findByPk(id);

      if (!contato) {
        return res.status(404).json({ erro: "Contato não encontrado" });
      }

      return res.json(contato);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro no servidor" });
    }
  },

  async criar(req, res) {
    try {
      const payload = req.body;

      const novo = await Contato.create(payload);

      console.log(`✅ Contato criado: ${novo.nome}`);

      return res.status(201).json({
        mensagem: "Contato criado com sucesso!",
        data: novo,
      });
    } catch (err) {
      console.error(err);

      if (err.name === "SequelizeValidationError") {
        return res.status(400).json({
          erro: err.errors.map((e) => e.message),
        });
      }

      return res.status(500).json({ erro: "Erro ao criar contato" });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const payload = req.body;

      const contato = await Contato.findByPk(id);

      if (!contato) {
        return res.status(404).json({ erro: "Contato não encontrado" });
      }

      await contato.update(payload);

      return res.json({
        mensagem: "Contato atualizado com sucesso!",
        data: contato,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao atualizar contato" });
    }
  },

  async patch(req, res) {
    try {
      const { id } = req.params;
      const payload = req.body;

      const contato = await Contato.findByPk(id);

      if (!contato) {
        return res.status(404).json({ erro: "Contato não encontrado" });
      }

      await contato.update(payload);

      return res.json({
        mensagem: "Contato atualizado parcialmente!",
        data: contato,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao atualizar parcialmente" });
    }
  },

  async remover(req, res) {
    try {
      const { id } = req.params;

      const contato = await Contato.findByPk(id);

      if (!contato) {
        return res.status(404).json({ erro: "Contato não encontrado" });
      }

      await contato.destroy();

      return res.json({ mensagem: "Contato removido com sucesso!" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: "Erro ao remover contato" });
    }
  },
};
