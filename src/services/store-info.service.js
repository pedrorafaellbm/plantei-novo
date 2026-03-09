import { z } from 'zod';
import { StoreInfo } from '../models/StoreInfo.js';

const defaultContent = {
  title: 'Sobre a Loja',
  description:
    'Somos uma loja dedicada ao cultivo e venda de plantas de qualidade, com foco em praticidade, curadoria e atendimento humano.',
  mission:
    'Conectar pessoas a natureza com produtos selecionados, informacao clara e uma compra simples.',
  quality:
    'Cada item e escolhido para garantir boa adaptacao, visual bonito e excelente apresentacao.',
  delivery:
    'Despacho rapido, embalagens seguras e acompanhamento atencioso para cada pedido.',
};

const storeInfoSchema = z.object({
  title: z.string().trim().min(1).optional(),
  description: z.string().trim().optional().or(z.literal('')),
  mission: z.string().trim().optional().or(z.literal('')),
  quality: z.string().trim().optional().or(z.literal('')),
  delivery: z.string().trim().optional().or(z.literal('')),
});

const ensureStoreInfo = async () => {
  const existing = await StoreInfo.findOne({ order: [['id', 'ASC']] });
  if (existing) return existing;
  return StoreInfo.create(defaultContent);
};

export const getStoreInfo = async () => {
  const info = await ensureStoreInfo();
  return info;
};

export const updateStoreInfo = async (payload) => {
  const parsed = storeInfoSchema.parse(payload);
  const info = await ensureStoreInfo();
  await info.update({
    ...(parsed.title !== undefined ? { title: parsed.title } : {}),
    ...(parsed.description !== undefined ? { description: parsed.description || null } : {}),
    ...(parsed.mission !== undefined ? { mission: parsed.mission || null } : {}),
    ...(parsed.quality !== undefined ? { quality: parsed.quality || null } : {}),
    ...(parsed.delivery !== undefined ? { delivery: parsed.delivery || null } : {}),
  });
  return info;
};
