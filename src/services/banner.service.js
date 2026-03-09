import { z } from 'zod';
import { Banner } from '../models/Banner.js';

const bannerSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().optional().or(z.literal('')),
  image_url: z.string().trim().url().optional(),
  link: z.string().trim().min(1).optional().or(z.literal('')),
  button_text: z.string().trim().max(120).optional().or(z.literal('')),
});

export const listBanners = async () => Banner.findAll({ order: [['createdAt', 'DESC']] });

export const createBanner = async (payload) => {
  const parsed = bannerSchema.parse(payload);
  return Banner.create({
    title: parsed.title,
    description: parsed.description || null,
    imageUrl: parsed.image_url,
    link: parsed.link || null,
    buttonText: parsed.button_text || null,
  });
};

export const updateBanner = async (id, payload) => {
  const parsed = bannerSchema.partial().parse(payload);
  const banner = await Banner.findByPk(id);
  if (!banner) return null;
  await banner.update({
    ...(parsed.title !== undefined ? { title: parsed.title } : {}),
    ...(parsed.description !== undefined ? { description: parsed.description || null } : {}),
    ...(parsed.image_url !== undefined ? { imageUrl: parsed.image_url } : {}),
    ...(parsed.link !== undefined ? { link: parsed.link || null } : {}),
    ...(parsed.button_text !== undefined ? { buttonText: parsed.button_text || null } : {}),
  });
  return banner;
};

export const removeBanner = async (id) => {
  const banner = await Banner.findByPk(id);
  if (!banner) return false;
  await banner.destroy();
  return true;
};
