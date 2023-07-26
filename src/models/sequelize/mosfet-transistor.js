//External
const { DataTypes } = require('sequelize');
//Database
const { dbConnection } = require('../../db/local-config');
//Models
const { Component } = require('./component');


/**
 * @description database mosfet-transistor model with their respective fields and constraints
 */
let MosfetTransistor = dbConnection.define("transistores_mosfet", {
    id_componente: {
        type: DataTypes.INTEGER
        , allowNull: false
        , references :{
            model: Component,
            key: 'id'
        }
    },
    tipo: {
        type: DataTypes.STRING(10)
        , allowNull: false
    },
    voltaje_drenaje_fuente: {
        type: DataTypes.STRING(30)
        , allowNull: true
    },
    corriente_cc_drenaje: {
        type: DataTypes.STRING(30)
        , allowNull: true
    },
    disip_max: {
        type: DataTypes.STRING(30)
        , allowNull: true
    },
    temp_op_max: {
        type: DataTypes.STRING(50)
        , allowNull: true
    },
    conduct_drenaje_sustrato: {
        type: DataTypes.STRING(50)
        , allowNull: true
    },
    resist_drenaje_fuente: {
        type: DataTypes.STRING(50)
        , allowNull: true
    },
},
    {
        timestamps: false
    });

  



module.exports = { MosfetTransistor }
