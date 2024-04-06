
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const UserAccount = require('../models/UserAccounts');

const router = Router();

router.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Now check with the database
  const user = UserAccount.findUser(username);
  if (!user) {
    res.status(401).json({'error': 'User does not exist'});
    return;
  }
  if (await user.checkPassword(password))
    res.status(405).json({'msg': 'Incorrect password'});
  else {
    // we have to generate the jwt token
    res.status(201).json({'msg': 'Logged-in successfully'});
  }
});

router.post('/create', (req, res) => {
  if (!req.headers.authorization) {
    res.status(401).send('Not authorized');
    return;
  }
  let token = req.headers.authorization.split(' ')[1];
  if (token !== 'my_simple_token_in_english') {
    res.status(401).send('Bad credentials');
    return;
  }

  const username = req.body.username;
  const password = req.body.password;

  UserAccount.createAdmin(username, password);
  res.send('Successfully created user');
});

router.post('/change-passwd', (req, res) => {
  const username = req.body.username;
  const oldPasswd = req.body.old_password;
  const newPasswd = req.body.new_password;

  UserAccount.findUser(username).then(user => {
    if (user) {
      user.changePassword(oldPasswd, newPasswd);
      res.send('Successfully changed the password');
    }
  });
});

module.exports = router;
