import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { Usuario } from './Usuario.js';
import { Produto } from './produto.js';

export const Favorito = sequelize.define(
  'Favorito',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuarioId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'usuario_id',
    },
    produtoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'produto_id',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
  },
  {
    tableName: 'favoritos',
    freezeTableName: true,
    updatedAt: false,
    indexes: [
      {
        unique: true,
        fields: ['usuario_id', 'produto_id'],
      },
    ],
  }
);

Favorito.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
Favorito.belongsTo(Produto, { foreignKey: 'produtoId', as: 'produto' });
Usuario.hasMany(Favorito, { foreignKey: 'usuarioId', as: 'favoritos' });
Produto.hasMany(Favorito, { foreignKey: 'produtoId', as: 'favoritos' });
