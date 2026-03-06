import { z } from 'zod';
import { Contact } from '../models/Contact.js';

const contactSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  message: z.string().trim().min(1),
});

export const createContact = async (payload) => {
  const parsed = contactSchema.parse(payload);
  return Contact.create(parsed);
};
