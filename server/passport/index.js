import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt-nodejs';
import { User } from '../db/models';
import { serializeUser } from '../db/user/User';

export default (app, config) => {
  app.use(passport.initialize());
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: config.JWT_SECRET_KEY,
  };
  passport.use(new JwtStrategy(opts,
    (username, password, done) => {
      User.findOne({
        where: {
          'username': username,
        },
      }).then((user) => {
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
  ));

  passport.serializeUser((user, done) => {
    done(null, serializeUser(user));
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: {
        'id': id,
      },
    }).then((user) => {
      if (user == null) {
        done(new Error('Wrong user id.'));
      }

      done(null, user);
    });
  });
};
