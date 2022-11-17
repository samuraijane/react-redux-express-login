const router = require('express').Router();
const { User } = require('../models');
const { createAuthToken } = require('../utils');

router.post('/login', async (req, res) => {
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

module.exports = router;