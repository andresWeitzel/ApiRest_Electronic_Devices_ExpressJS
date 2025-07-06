//Models
const { Component } = require('./component');
const { ComponentDetail } = require('./component-detail');
const { BipolarTransistor } = require('./bipolar-transistor');
const { MosfetTransistor } = require('./mosfet-transistor');
const { ElectrolycticCapacitor } = require('./electrolytic_capacitor');

/**
 * @description Define all model associations to avoid circular dependencies
 */
const defineAssociations = () => {
  // Component associations
  Component.hasMany(ComponentDetail, {
    foreignKey: 'id_componente',
    foreignKeyConstraint: true,
  });
  
  Component.hasOne(BipolarTransistor, {
    foreignKey: 'id_componente',
    foreignKeyConstraint: true,
  });
  
  Component.hasOne(MosfetTransistor, {
    foreignKey: 'id_componente',
    foreignKeyConstraint: true,
  });
  
  Component.hasOne(ElectrolycticCapacitor, {
    foreignKey: 'id_componente',
    foreignKeyConstraint: true,
  });

  // ComponentDetail associations
  ComponentDetail.belongsTo(Component, {
    foreignKey: 'id_componente',
    as: 'component',
  });

  // BipolarTransistor associations
  BipolarTransistor.belongsTo(Component, {
    foreignKey: 'id_componente',
    as: 'component',
  });

  // MosfetTransistor associations
  MosfetTransistor.belongsTo(Component, {
    foreignKey: 'id_componente',
    as: 'component',
  });

  // ElectrolycticCapacitor associations
  ElectrolycticCapacitor.belongsTo(Component, {
    foreignKey: 'id_componente',
    as: 'component',
  });
};

module.exports = { defineAssociations }; 