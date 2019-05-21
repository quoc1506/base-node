'use strict';
module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define('messages', {
    d: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    userId: Sequelize.UUID,
    conversationId: Sequelize.UUID,
    content: Sequelize.TEXT,
  }, {});
  Table.associate = function(models) {
    // associations can be defined here
  };
  return Table;
};
