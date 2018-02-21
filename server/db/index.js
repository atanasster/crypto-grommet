import Sequelize from 'sequelize';
import config from '../config';

const connection = new Sequelize(process.env.DATABASE_URL || config.DATABASE_URL, {
  operatorsAliases: Sequelize.Op,
  host: 'localhost',
  dialect: 'postgres',
});

connection.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default connection;
