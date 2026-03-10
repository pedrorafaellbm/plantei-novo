import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { StoreInfo } from './StoreInfo.js';

export const StoreInfoCard = sequelize.define(
  'StoreInfoCard',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(120), allowNull: false },
    body: { type: DataTypes.TEXT, allowNull: false },
    position: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    storeInfoId: { type: DataTypes.INTEGER, allowNull: false, references: { model: StoreInfo, key: 'id' }, field: 'store_info_id' },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'updated_at' },
  },
  {
    tableName: 'store_info_cards',
    freezeTableName: true,
  }
);
