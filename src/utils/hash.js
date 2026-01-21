import bcrypt from 'bcrypt';

export const gerarHash = asyng (senha) => {
    return bcrypt.hash(senha, 10);
};

export const comprerHash = async (senha) => {
    return bcrypt.compare(senha, hash);
};
