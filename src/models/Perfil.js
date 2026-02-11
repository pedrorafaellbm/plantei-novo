import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Perfil = sequelize.define('perfil', {
    nome: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            //notNull: { msg: "Nome do produto é obrigatório" },  // <- ADICIONE ISTO
            notEmpty: { msg: "Nome do produto é obrigatório" },
            len: {
                args: [3, 150],
                msg: "Nome deve ter entre 3 e 150 caracteres"
            }
        }
    },

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    codigo: {
        type: DataTypes.STRING(7),
        allowNull: false,
        validate: {
            notEmpty: { msg: "Código do perfil é obrigatório" },
            len: {
                args: [3, 7],
                msg: "Código deve ter entre 3 e 7 caracteres"
            }
        }
    }

})
