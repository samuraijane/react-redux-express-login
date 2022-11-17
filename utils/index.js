const jwt = require('jsonwebtoken');

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

module.exports = { createAuthToken };