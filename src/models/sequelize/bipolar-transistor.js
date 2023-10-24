//External
const { DataTypes } = require('sequelize');
//Database
const { dbConnection } = require('../../db/local-config');
//Models
const { Component } = require('./component');

/**
 * @description database bipolar-transistor model with their respective fields and constraints
 */
let BipolarTransistor = dbConnection.define(
  'transistores_bipolares',
  {
    id_componente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Component,
        key: 'id',
      },
    },
    tipo: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    voltaje_colec_emis: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    voltaje_colec_base: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    voltaje_emis_base: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    voltaje_colec_emis_sat: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    corriente_colec: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    ganancia_hfe: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    disip_max: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    temp_juntura: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: 'transistores_bipolares',
  },
);

module.exports = { BipolarTransistor };
