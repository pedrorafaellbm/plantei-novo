import prisma from '../config/prisma.js';

export const healthCheck = async (req, res, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.status(200).json({
      status: 'UP',
      database: 'Connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return next(error);
  }
};
