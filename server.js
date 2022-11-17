const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const { User } = require('./models');

const server = express();

server.use(express.json());
server.use(express.static(path.resolve(`${__dirname}/react-ui/build`)));

const createAuthToken = user => {
  return jwt.sign(
    {
      id: user.id,
      login: Date.now()
    },
    'secret',
    {
      algorithm: 'HS256',
      expiresIn: 180,
      subject: user.email
    }
  );
};

const ensureAuthentication = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({isSuccess: false});
  }

  try {
    jwt.verify(token, 'secret');
  } catch(error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({isSuccess: false, message: error.message});
    } else {
      res.status(401).json({isSuccess: false, message: 'An error has occurred.'})
    }
  }
  next();
};

server.get('/heartbeat', (req, res) => {
  res.json({is: 'working'});
});

server.post('/login', async (req, res) => {
  const { password, username } = req.body;
  const user = await User.findOne({
    where: {
      password,
      username
    }
  });
  if (user) {
    const token = createAuthToken(user);
    res.json({isSuccess: true, token});
  } else {
    res.json({isSuccess: false});
  }
});

server.get('/profile/:id', ensureAuthentication, async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id }
  });
  if (user) {
    const { email, firstName, lastName, username } = user;
    res.json({isSuccess: true, user: {email, firstName, lastName, username}});
  } else {
    res.json({isSuccess: false});
  }
});

server.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/react-ui/build/index.html`));
});

server.listen(8080, () => {
  console.log('The server is listening at PORT 8080.')
});