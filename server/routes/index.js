const router = require('express').Router();

require('express-group-routes');

router.group('/auth', router => {
  router.post('/login');
  router.post('/register');
});

router.group('/users', router => {
  router.get('/');
  router.get('/:id');
});

module.exports = router;
