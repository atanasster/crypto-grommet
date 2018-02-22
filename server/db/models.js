import * as UserMeta from './user/User';
import connection from './index';

// eslint-disable-next-line import/prefer-default-export
export const User = connection.define('users', UserMeta.attributes, UserMeta.options);

connection.sync({ force: true, logging: console.log });
