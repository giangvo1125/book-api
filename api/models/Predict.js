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
    matchcode: {
      type: Sequelize.INTEGER(255),
      allowNull: true,
    },
    data: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    resultHome681: {
      type: Sequelize.STRING(255),
      allowNull: true,
    }, 
    resultAway681: {
      type: Sequelize.STRING(255),
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
    tableName: 'predict',
    hooks: {}
  }
};
