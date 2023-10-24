//External
const { DataTypes } = require('sequelize');
//Database
const { dbConnection } = require('../../db/local-config');
//Models
const { Component } = require('./component');

/**
 * @description database component_detail model with their respective fields and constraints
 */
let ComponentDetail = dbConnection.define(
  'componentes_detalles',
  {
    id_componente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Component,
        key: 'id',
      },
    },
    hoja_de_datos: {
      type: DataTypes.STRING(3000),
      allowNull: false,
    },
    longitud: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    ancho: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    peso: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    material: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    voltaje_recomendado: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    voltaje_min_entrada: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    voltaje_max_entrada: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: 'componentes_detalles',
  },
);

module.exports = { ComponentDetail };
