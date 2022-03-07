const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');

// /api/users
router
  .route('/')
  .get(getAllUser)
  // .get(getUsers)
  .post(createUser);

// /api/user/:id
router
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

  // add friend
  // router
  // .route('/:userId/friends')
  // .post(addFriend)
 
  // remove friend
  router
  .route('/:userId/friends/:friendId')
  .delete(removeFriend)
  .post(addFriend);

module.exports = router;

// getUsers, getSingleUser, createUser, deleteUser, updateUser, addfriend, removeFriend
// 
