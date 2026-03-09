import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Category } from './Category.js';

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
    categoria: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: 'Plantas',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'category_id',
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'featured',
    },
  },
  {
    tableName: 'produtos',
    freezeTableName: true,
    timestamps: true,
  }
);

Produto.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Produto, { foreignKey: 'categoryId', as: 'products' });
