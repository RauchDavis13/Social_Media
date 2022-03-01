const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const UserRoutes = require('./user-routes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', UserRoutes);

module.exports = router;
