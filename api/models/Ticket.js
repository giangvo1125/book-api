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
    ChoiceValue: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    odds: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    oddsid: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    Matchid: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    betteam: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    kickofftime: {
      type: Sequelize.STRING(255),
      allowNull: true,
    }, 
    status: {
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
    tableName: 'ticket',
    hooks: {}
  }
};
