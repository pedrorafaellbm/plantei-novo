import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const StoreInfo = sequelize.define(
  'StoreInfo',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(160), allowNull: false, defaultValue: 'Sobre a Loja' },
    description: { type: DataTypes.TEXT, allowNull: true },
    mission: { type: DataTypes.TEXT, allowNull: true },
    quality: { type: DataTypes.TEXT, allowNull: true },
    delivery: { type: DataTypes.TEXT, allowNull: true },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
    },
  },
  {
    tableName: 'store_info',
    freezeTableName: true,
  }
);
