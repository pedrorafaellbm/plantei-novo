import { createAddress, listAddresses, removeAddress, updateAddress } from '../services/address.service.js';

export default {
  async list(req, res) {
    const data = await listAddresses(req.user.id);
    return res.status(200).json({ data, size: data.length });
  },

  async create(req, res) {
    const data = await createAddress(req.user.id, req.body);
    return res.status(201).json({ data });
  },

  async update(req, res) {
    const data = await updateAddress(req.user.id, req.params.id, req.body);
    if (!data) return res.status(404).json({ error: 'Address not found' });
    return res.status(200).json({ data });
  },

  async remove(req, res) {
    const removed = await removeAddress(req.user.id, req.params.id);
    if (!removed) return res.status(404).json({ error: 'Address not found' });
    return res.status(200).json({ message: 'Address removed' });
  },
};
