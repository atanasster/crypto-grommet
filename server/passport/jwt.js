import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt/lib/index';
import { User } from '../db/models';

// Generate an Access Token for a User ID
export const generateToken = (userId, config) => {
  // How long will the token be valid for
  const expiresIn = config.JWT_EXPIRES_IN;
  // secret key
  const secret = config.JWT_SECRET_KEY;

  return jwt.sign({}, secret, {
    expiresIn,
    subject: userId.toString(),
  });
};

export default (config) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: config.JWT_SECRET_KEY,
  };
  return new JwtStrategy(opts,
    (username, password, done) => {
      User.findOne({
        where: {
          'username': username,
        },
      })
        .then((user) => {
          if (user == null) {
            return done(null, false, { message: 'Incorrect credentials.' });
          }

          const hashedPassword = bcrypt.hashSync(password, user.salt);

          if (user.password === hashedPassword) {
            return done(null, user);
          }

          return done(null, false, { message: 'Incorrect credentials.' });
        });
    }
  );
};
