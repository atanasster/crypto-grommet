import bcrypt from 'bcrypt-nodejs';
import { User } from '../db/models';
import { serializeUser } from '../db/user/User';
import { generateToken } from './jwt';

export const signup = (req, res) => {
  const { username, password, password2, email } = req.body;

  if (!username || !password || !password2) {
    return res.json({ success: false, message: 'Please pass username and password.' });
  }
  if (!email) {
    return res.json({ success: false, message: 'Email is a required field.' });
  }

  if (password !== password2) {
    return res.json({ success: false, message: 'Please, enter the same password twice.' });
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return res.json({ success: false, message: 'Salt generate error.' });
    }
    bcrypt.hash(password, salt, null, (_err, hashedPassword) => {
      if (err) {
        return res.json({ success: false, message: 'Encryption error.' });
      }
      const newUser = {
        username,
        email,
        salt,
        password: hashedPassword,
      };
      User.create(newUser)
        .then(() => res.json({ success: true, user: serializeUser(newUser) }))
        .catch(e => res.json({ success: false, message: e }));
      return null;
    });
    return null;
  });
  return null;
};

export const login = (req, res, config) => {
  const { username, password } = req.body;
  User.findOne({
    where: {
      'username': username,
    },
  }).then((user) => {
    if (user == null) {
      return res.status(401)
        .send({ success: false, message: 'Authentication failed. User not found.' });
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch && !err) {
        // if user is found and password is right create a token
        const token = generateToken(user.id, config);
        // return the user information including token as JSON
        res.json({ success: true, token, user: serializeUser(user) });
      } else {
        res.status(401)
          .send({ success: false, message: 'Authentication failed. Wrong password.' });
      }
    });
    return null;
  });
};
