import { Produto } from "./Produto";
import { Usuario } from "./Usuario";
import { Perfil } from "./Perfil";
import { Contato } from "../config/database.js";

Perfil.hasMany(Usuario, { foreignKey: 'perfilid' });
Usuario.belongsTo(Perfil, { foreignKey: 'perfilid' });

export {
    Produto,
    Usuario,
    Perfil,
    Contato
};