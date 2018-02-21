import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from '../db/models';

export default (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(
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
    done(null, user.id);
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
