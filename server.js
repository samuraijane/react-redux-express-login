const express = require('express');
const { User } = require('./models');

const server = express();

server.use(express.json());

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
    res.json({isSuccess: true});
  } else {
    res.json({isSuccess: false});
  }
});

server.listen(8080, () => {
  console.log('The server is listening at PORT 8080.')
});