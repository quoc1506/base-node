'use strict';
module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define('conversation', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    userId1: Sequelize.UUID,
    userId2: Sequelize.UUID,
  }, {});
  Table.associate = function (models) {
    // associations can be defined here
  };
  return Table;
};
