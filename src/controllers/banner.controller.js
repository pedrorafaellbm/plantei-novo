import fs from 'node:fs/promises';
import cloudinary from '../config/cloudinary.js';
import { createBanner, listBanners, removeBanner, updateBanner } from '../services/banner.service.js';
import HttpError from '../utils/http-error.js';

const removeTempFile = async (filePath) => {
  if (!filePath) return;
  try {
    await fs.unlink(filePath);
  } catch {
    // noop
  }
};

const assertCloudinaryEnv = () => {
  if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
    throw new HttpError(500, 'Cloudinary nao configurado');
  }
};

const uploadToCloudinary = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'vida-verde/banners',
    resource_type: 'image',
  });
  return result.secure_url;
};

export default {
  async list(req, res) {
    const data = await listBanners();
    return res.status(200).json({ data, size: data.length });
  },

  async create(req, res, next) {
    try {
      let imageUrl = req.body.image_url;
      if (req.file?.path) {
        assertCloudinaryEnv();
        imageUrl = await uploadToCloudinary(req.file.path);
      }
      const data = await createBanner({ ...req.body, image_url: imageUrl });
      return res.status(201).json({ data });
    } catch (err) {
      return next(err);
    } finally {
      await removeTempFile(req.file?.path);
    }
  },

  async update(req, res, next) {
    try {
      let imageUrl = req.body.image_url;
      if (req.file?.path) {
        assertCloudinaryEnv();
        imageUrl = await uploadToCloudinary(req.file.path);
      }
      const data = await updateBanner(req.params.id, { ...req.body, ...(imageUrl ? { image_url: imageUrl } : {}) });
      if (!data) return res.status(404).json({ error: 'Banner not found' });
      return res.status(200).json({ data });
    } catch (err) {
      return next(err);
    } finally {
      await removeTempFile(req.file?.path);
    }
  },

  async remove(req, res) {
    const removed = await removeBanner(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Banner not found' });
    return res.status(200).json({ message: 'Banner removed' });
  },
};
