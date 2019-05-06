'use strict';
module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define('user_images', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    userId: Sequelize.UUID,
    image: Sequelize.STRING,
    width: Sequelize.DOUBLE,
    height: Sequelize.DOUBLE,
  }, {});
  Table.associate = function(models) {
    // associations can be defined here
  };
  return Table;
};
