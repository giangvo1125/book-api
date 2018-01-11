module.exports = {
  attributes: {
    id: {
      type: Sequelize.INTEGER(20),
      autoIncrement: true,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Must be an integer!'
        }
      },
      primaryKey: true
    },
    match: {
      type: Sequelize.INTEGER(255),
      allowNull: true,
    },
    matchcode: {
      type: Sequelize.INTEGER(255),
      allowNull: true,
    },
    result: {
      type: Sequelize.INTEGER(20),
      allowNull: false,
    },
    cas: {
      type: Sequelize.DOUBLE,
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    }
  },
  associations: function() {},
  options: {
    tableName: 'History',
    hooks: {}
  }
};
