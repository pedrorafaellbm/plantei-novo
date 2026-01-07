module.exports = (sequelize, DataTypes) => {
  const Contato = sequelize.define("Contato", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assunto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Contato;
};