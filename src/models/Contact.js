import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Contact = sequelize.define(
  'Contact',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(150), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false },
    message: { type: DataTypes.STRING(500), allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'created_at' },
  },
  {
    tableName: 'contacts',
    freezeTableName: true,
    updatedAt: false,
  }
);
