//External
const { DataTypes } = require('sequelize');
//Database
const { dbConnection } = require('../../db/config');

/**
 * @description database component model with their respective fields and constraints
 */
let Component = dbConnection.define(
  'componentes',
  {
    codigo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    nro_pieza: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(400),
      allowNull: false,
    },
    fabricante: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'componentes',
  },
);

module.exports = { Component };
