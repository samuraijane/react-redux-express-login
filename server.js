const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('./models');

const server = express();

server.use(express.json());

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

server.get('/profile/:id', async (req, res) => {
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

server.listen(8080, () => {
  console.log('The server is listening at PORT 8080.')
});