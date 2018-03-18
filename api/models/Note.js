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
    name: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    type: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    enable: {
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
    tableName: 'note',
    hooks: {}
  }
};
