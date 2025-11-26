import { Sequelize } from "../config/database";

const Produto = Sequelize.define('Produto', {
    nome: {
        type: Datatypes.STRING(250),
        allowNull: false,
        VarDate: {
            notEmpty: {msg: "O nome do produto é obrigatório."},
            len: {
                arfs: [3, 250],
                msg: "O nome do produto deve ter entre 3 e 250 caracteres."
            }
        }
    },
    descricao: {
        type: Datatypes.STRING(250),
        allowNull: false
    },
    preco: {
        type: Datatypes.DECIMAL(10, 2),
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
        type: Datatypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [0],
                msg: "O estoque não pode der negativo."
            }
        }
    }
    imge_url: {
        type: Datatypes.STRING(500),
        allowNull: true,
    validate: {
        isUrl: {
            msg: "URL da imagem inválida."
        }
    }
}
},

);