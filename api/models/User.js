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
    username: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    hidubmit: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    IEVerison: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    detecResTime: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    hidServerKey: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    IsSSL: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    PF: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    sessionId: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    host: {
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
    tableName: 'user',
    hooks: {}
  }
};
