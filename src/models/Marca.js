import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Marca = sequelize.define("marca", {
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: "Nome da marca é obrigatório" },
      len: {
        args: [3, 100],
        msg: "Nome deve ter entre 3 e 100 caracteres"
      }
    }
  },
  descricao: {
    type: DataTypes.STRING(250),
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: "marcas"
});
