//External
const { DataTypes } = require('sequelize');
//Config
const { dbConnection } = require('../../db/localConfig');


/**
 * @description database component model with their respective fields and constraints
 */
const Componente = dbConnection.define("componente", {
    id: {
        type: DataTypes.INTEGER
        , allowNull: true
        , primaryKey: true
    },
    codigo: {
        type: DataTypes.STRING(100)
        , allowNull: false
    },
    imagen: {
        type: DataTypes.STRING(100)
        , allowNull: false
    },
    nro_pieza: {
        type: DataTypes.STRING(200)
        , allowNull: false
    },
    categoria: {
        type: DataTypes.STRING(100)
        , allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(100)
        , allowNull: false
    },
    fabricante: {
        type: DataTypes.STRING(100)
        , allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER
        , allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(8,2)
        , allowNull: false
    }
},
    {
        timestamps: false
    });



module.exports = { Componente }
