const router = require('express').Router();
const {
  addThought,
  removeThought,
  getThoughts,
  getSingleThought,
  updateThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/ posting thought 
router
  .route('/')
  .post(addThought)
  .get(getThoughts)
 


// /api/thoughts//<thoughtId>
router
  .route('/:thoughtId')
  .put(updateThought)
  .get(getSingleThought)
  .delete(removeThought);

// /api/thoughts/<thoughtId>/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/<thoughtId>/reactions/:reactionsId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);


module.exports = router;
