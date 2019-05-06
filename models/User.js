'use strict';
module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define('users', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    name: Sequelize.STRING,
    fbId: Sequelize.STRING(50),
    avatar: Sequelize.STRING,
  }, {});
  Table.associate = function(models) {
    // associations can be defined here
  };
  return Table;
};
