import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Banner = sequelize.define(
  'Banner',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(160), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    imageUrl: { type: DataTypes.TEXT, allowNull: false, field: 'image_url' },
    link: { type: DataTypes.TEXT, allowNull: true },
    buttonText: { type: DataTypes.STRING(120), allowNull: true, field: 'button_text' },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'created_at' },
  },
  {
    tableName: 'banners',
    freezeTableName: true,
    updatedAt: false,
  }
);
