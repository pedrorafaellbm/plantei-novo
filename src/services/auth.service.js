export const registrarUsuario = async (payload) => {
    const senhaHash = await gerarHash(payload.senha);

    return Usuario.create({})
}

export const autenticarUsuario = async 