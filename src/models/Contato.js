import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Contato = sequelize.define('Contato', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mensagem: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
});

export default Contato;