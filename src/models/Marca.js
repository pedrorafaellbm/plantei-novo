import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Marca = sequelize.define('Marca', {
    nome: {
        type: DataTypes.STRING(250),
        allowNull: false,
        validate: {
            notEmpty: {msg: "O nome da marca é obrigatório."},
            len: {
                args: [3, 250],
                msg: "O nome da marca deve ter entre 3 e 250 caracteres."
            }
        }
    },

       image_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
            isUrl: {
                msg: "URL da imagem inválida."
            }
        }
    },
    descricao: {
        type: DataTypes.STRING(250),
        allowNull: false
    },

});
