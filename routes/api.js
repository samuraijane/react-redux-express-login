const router = require('express').Router();
const { User } = require('../models');
const { ensureAuthentication } = require('../middleware');

router.get('/profile/:id', ensureAuthentication, async (req, res) => {
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

module.exports = router;