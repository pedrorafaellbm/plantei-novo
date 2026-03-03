import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Produto = sequelize.define(
  'Produto',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    estoque: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'imageUrl',
    },
  },
  {
    tableName: 'produtos',
    freezeTableName: true,
    timestamps: true,
  }
);
