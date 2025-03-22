const authController = require('../controllers/auth.controller');

const router = require('express').Router();

require('express-group-routes');

router.group('/auth', router => {
  router.post('/login', authController.login);
  router.post('/verify', authController.verify);
});

router.group('/users', router => {
  router.get('/');
  router.get('/:id');
});

module.exports = router;
