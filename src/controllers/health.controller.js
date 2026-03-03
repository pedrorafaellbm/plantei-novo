import { sequelize } from '../config/database.js';

export const healthCheck = async (req, res, next) => {
  try {
    await sequelize.query('SELECT 1');
    return res.status(200).json({
      status: 'UP',
      database: 'Connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return next(error);
  }
};
