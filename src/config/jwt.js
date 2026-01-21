export default {
    secret: process.env.JWT_SECRET || 'CHAVE _SECRETA',
    expiresIn: '1h',
}