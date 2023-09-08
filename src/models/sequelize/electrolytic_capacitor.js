//External
const { DataTypes } = require("sequelize");
//Database
const { dbConnection } = require("../../db/local-config");
//Models
const { Component } = require("./component");

/**
 * @description database electrolyctic-capacitor model with their respective fields and constraints
 */
let ElectrolycticCapacitor = dbConnection.define(
  'capacitores_electroliticos',
  {
    id_componente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Component,
        key: "id",
      },
    },
    tipo: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    capacitancia: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    tolerancia: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    rango_temperatura: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    rango_tension_nominal: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: 'capacitores_electroliticos',
  }
);

module.exports = { ElectrolycticCapacitor };
