import fs from 'node:fs/promises';
import cloudinary from '../config/cloudinary.js';
import produtoService from '../services/produto.service.js';
import HttpError from '../utils/http-error.js';
import { log } from '../utils/logger.js';

const uploadToCloudinary = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'vida-verde/products',
    resource_type: 'image',
  });
  return result.secure_url;
};

const removeTempFile = async (filePath) => {
  if (!filePath) return;
  try {
    await fs.unlink(filePath);
  } catch {
    // noop
  }
};

const assertCloudinaryEnv = () => {
  const hasConfig =
    Boolean(process.env.CLOUD_NAME) &&
    Boolean(process.env.API_KEY) &&
    Boolean(process.env.API_SECRET);

  if (!hasConfig) {
    throw new HttpError(
      500,
      'Cloudinary nao configurado. Defina CLOUD_NAME, API_KEY e API_SECRET no .env.'
    );
  }
};

export default {
  async create(req, res, next) {
    let imageUrl = req.body.imageUrl;
    try {
      if (req.file?.path) {
        assertCloudinaryEnv();
        imageUrl = await uploadToCloudinary(req.file.path);
      }

      const created = await produtoService.criar({
        ...req.body,
        imageUrl,
      });

      return res.status(201).json({ data: created });
    } catch (err) {
      log.error(err);
      return next(err);
    } finally {
      await removeTempFile(req.file?.path);
    }
  },

  async update(req, res, next) {
    let imageUrl = req.body.imageUrl;
    try {
      if (req.file?.path) {
        assertCloudinaryEnv();
        imageUrl = await uploadToCloudinary(req.file.path);
      }

      const updated = await produtoService.atualizar(
        req.params.id,
        { ...req.body, ...(imageUrl ? { imageUrl } : {}) },
        true
      );

      if (!updated) return res.status(404).json({ error: 'Produto nao encontrado' });
      return res.status(200).json({ data: updated });
    } catch (err) {
      log.error(err);
      return next(err);
    } finally {
      await removeTempFile(req.file?.path);
    }
  },

  async remove(req, res, next) {
    try {
      const removed = await produtoService.remover(req.params.id);
      if (!removed) return res.status(404).json({ error: 'Produto nao encontrado' });
      return res.status(200).json({ message: 'Produto removido com sucesso' });
    } catch (err) {
      log.error(err);
      return next(err);
    }
  },
};
