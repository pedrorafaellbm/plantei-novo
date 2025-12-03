import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Produto = sequelize.define('Produto', {
    nome: {
        type: DataTypes.STRING(250),
        allowNull: false,
        validate: {
            notEmpty: {msg: "O nome do produto é obrigatório."},
            len: {
                arfs: [3, 250],
                msg: "O nome do produto deve ter entre 3 e 250 caracteres."
            }
        }
    },
    descricao: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: {msg: "Preço Inválido."},
            min: {
                args: [0],
                msg: "O preço deve ser maior ou igual a zero."
            }
        }
    },
    estoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [0],
                msg: "O estoque não pode der negativo."
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
}
},

);