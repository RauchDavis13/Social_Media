const router = require('express').Router();
const commentRoutes = require('./comment-routes');
const UserRoutes = require('./user-routes');

router.use('/comments', commentRoutes);
router.use('/users', UserRoutes);

module.exports = router;
