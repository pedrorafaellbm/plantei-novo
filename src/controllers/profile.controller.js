import { getProfile, updateProfile } from '../services/profile.service.js';

const mapUser = (user) => ({
  id: user.id,
  name: user.nome,
  email: user.email,
  role: user.role,
  avatar_url: user.avatarUrl || null,
});

export default {
  async get(req, res) {
    const user = await getProfile(req.user.id);
    return res.status(200).json({ data: mapUser(user) });
  },

  async update(req, res) {
    const user = await updateProfile(req.user.id, req.body);
    return res.status(200).json({ data: mapUser(user) });
  },
};
