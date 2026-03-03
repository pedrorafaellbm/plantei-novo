import fs from 'node:fs';
import path from 'node:path';
import multer from 'multer';

const tempDir = path.resolve('tmp', 'uploads');
fs.mkdirSync(tempDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, tempDir),
  filename: (_req, file, cb) => {
    const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const safeName = file.originalname.replace(/\s+/g, '-');
    cb(null, `${suffix}-${safeName}`);
  },
});

const imageFilter = (_req, file, cb) => {
  if (file.mimetype?.startsWith('image/')) return cb(null, true);
  return cb(new Error('Arquivo invalido. Envie apenas imagens.'));
};

export const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
