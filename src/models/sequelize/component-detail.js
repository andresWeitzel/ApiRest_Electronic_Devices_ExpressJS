//External
const { DataTypes } = require('sequelize');
//Database
const { dbConnection } = require('../../db/local-config');
//Models
const { Component } = require('./component');


/**
 * @description database component_detail model with their respective fields and constraints
 */
let ComponentDetail = dbConnection.define("componentes_detalles", {
    idComponente: {
        type: DataTypes.INTEGER
        , allowNull: false
        , references :{
            model: Component,
            key: 'id'
        }
    },
    hoja_de_datos: {
        type: DataTypes.STRING(300)
        , allowNull: false
    },
    longitud: {
        type: DataTypes.STRING(30)
        , allowNull: true
    },
    ancho: {
        type: DataTypes.STRING(30)
        , allowNull: true
    },
    peso: {
        type: DataTypes.STRING(30)
        , allowNull: true
    },
},
    {
        timestamps: false
    });

  



module.exports = { ComponentDetail }
