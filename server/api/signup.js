import bcrypt from 'bcrypt';
import { User } from '../db/models';

export const show = (req, res) => {
  res.render('signup');
};

export const signup = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  if (!username || !password || !password2) {
    req.flash('error', 'Please, fill in all the fields.');
    res.redirect('signup');
  }

  if (password !== password2) {
    req.flash('error', 'Please, enter the same password twice.');
    res.redirect('signup');
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = {
    username,
    salt,
    password: hashedPassword,
  };

  User.create(newUser).then(() => {
    res.redirect('/');
  }).catch(() => {
    req.flash('error', 'Please, choose a different username.');
    res.redirect('/signup');
  });
};
