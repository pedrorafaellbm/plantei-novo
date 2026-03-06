import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Usuario } from './Usuario.js';
import { Produto } from './produto.js';

export const Favorite = sequelize.define(
  'Favorite',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.STRING, allowNull: false, field: 'user_id' },
    productId: { type: DataTypes.INTEGER, allowNull: false, field: 'product_id' },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'created_at' },
  },
  {
    tableName: 'favorites',
    freezeTableName: true,
    updatedAt: false,
    indexes: [{ unique: true, fields: ['user_id', 'product_id'] }],
  }
);

Favorite.belongsTo(Usuario, { foreignKey: 'userId', as: 'user' });
Favorite.belongsTo(Produto, { foreignKey: 'productId', as: 'product' });
Usuario.hasMany(Favorite, { foreignKey: 'userId', as: 'favorites' });
Produto.hasMany(Favorite, { foreignKey: 'productId', as: 'favorites' });
