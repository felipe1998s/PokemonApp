const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'pokemon', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey:true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      life:{
        type: DataTypes.INTEGER,
        allowNull: true
      },
      attack: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      defense: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      speed: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      height:{
        type: DataTypes.INTEGER,
        allowNull: true
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      image:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"https://st2.depositphotos.com/1116329/11882/v/450/depositphotos_118824632-stock-illustration-samara-russia-august-4-2016.jpg"
      },
      createdInBD: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {timestamps: false}
  );
};
