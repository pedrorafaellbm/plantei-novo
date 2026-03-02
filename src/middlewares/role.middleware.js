export default function roleMiddleware(expectedRole) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== expectedRole) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    return next();
  };
}
