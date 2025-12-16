import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import "./index.js"

export const Categoria = sequelize.define('Categoria', {
    nome: {
        type: DataTypes.STRING(250),
        allowNull: false,
        validate: {
            notEmpty: {msg: "O nome da categoria é obrigatório."},
            len: {
                args: [3, 250],
                msg: "O nome da categoria deve ter entre 3 e 250 caracteres."
            }
        }
    },
    descricao: {
        type: DataTypes.STRING(250),
        allowNull: false
    },

},

);