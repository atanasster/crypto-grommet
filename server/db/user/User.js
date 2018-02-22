import Sequelize from 'sequelize';

export const attributes = {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  salt: {
    type: Sequelize.STRING,
  },
  social_id: {
    type: Sequelize.STRING,
  },
  social_provider: {
    type: Sequelize.STRING,
  },
};

export const options = {
  freezeTableName: true,
};

export const serializeUser = user => (
  {
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  }
);
