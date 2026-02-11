export default {
  // Chave secreta para assinatura do token JWT
  secret: process.env.JWT_SECRET || 'chave_super_secreta',
  expiresIn: '1m', // Tempo de expiração do token
};