import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Usuario } from './Usuario.js';

export const Address = sequelize.define(
  'Address',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.STRING, allowNull: false, field: 'user_id' },
    name: { type: DataTypes.STRING(150), allowNull: false },
    cep: { type: DataTypes.STRING(20), allowNull: false },
    state: { type: DataTypes.STRING(80), allowNull: false },
    city: { type: DataTypes.STRING(120), allowNull: false },
    district: { type: DataTypes.STRING(120), allowNull: false },
    street: { type: DataTypes.STRING(180), allowNull: false },
    number: { type: DataTypes.STRING(30), allowNull: false },
    complement: { type: DataTypes.STRING(180), allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'created_at' },
  },
  {
    tableName: 'addresses',
    freezeTableName: true,
    updatedAt: false,
  }
);

Address.belongsTo(Usuario, { foreignKey: 'userId', as: 'user' });
Usuario.hasMany(Address, { foreignKey: 'userId', as: 'addresses' });
