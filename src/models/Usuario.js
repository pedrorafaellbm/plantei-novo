module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define("Usuario", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true
    },

    dataNascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: "usuarios"
  });

  return Usuario;
};
