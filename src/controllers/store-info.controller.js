import { getStoreInfo, updateStoreInfo } from '../services/store-info.service.js';

export default {
  async get(req, res, next) {
    try {
      const data = await getStoreInfo();
      return res.status(200).json({ data });
    } catch (error) {
      return next(error);
    }
  },

  async update(req, res, next) {
    try {
      const data = await updateStoreInfo(req.body);
      return res.status(200).json({ data });
    } catch (error) {
      return next(error);
    }
  },
};
