import { ZodError } from 'zod';

export default function errorMiddleware(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ZodError) {
    return res.status(400).json({ error: err.issues[0]?.message || 'Dados invalidos' });
  }

  if (err?.statusCode) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error(err);
  return res.status(500).json({ error: 'Erro interno do servidor' });
}
