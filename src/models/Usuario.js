import { DataTypes } from 'sequelize';
import { randomUUID } from 'node:crypto';
import { sequelize } from '../config/database.js';

export const Usuario = sequelize.define('Usuario', 
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => randomUUID(),
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: { isEmail: true },
        },
        senhaHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: {
                    args: [11, 11],
                    msg: 'CPF deve conter 11 caracteres',
                }
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'customer',
            validate: {
                isIn: [['customer', 'admin']]
            }
        }
    },
    {
        tableName: 'User',
        freezeTableName: true,
        timestamps: true,
    }
);
