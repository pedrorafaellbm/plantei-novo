import { createContact } from '../services/contact.service.js';

export default {
  async create(req, res) {
    const data = await createContact(req.body);
    return res.status(200).json({ data, message: 'Contact created' });
  },
};
