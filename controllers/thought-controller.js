const { Thought, User, Reaction } = require('../models');

const thoughtController = {
  // get all thoughts
  getThoughts(req, res) {
    Thought.find({})
      .sort({ createdAt: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get a single thought
  getSingleThought({ params }, res) {
    Thought.findOne({ _id: params.thoughtId})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // add thought to user
  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        console.log(dbUserData);
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },  

  // remove thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(deletedThought => {
        if (!deletedThought) {
          res.status(404).json({ message: 'Thought has been removed!' });
          return;
        }
        res.json(deletedThought);
      })
      .catch(err => res.json(err));
  },

  // update thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
      .then(updatedThought => {
        if (!updatedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(updatedThought);
      })
  },

  // add reaction to thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // remove reaction
  removeReaction({ params }, res) {
    console.log('removing reaction');
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params._id } } },
      { new: true }
    )
      .then(dbReactionData => res.json(dbReactionData))     
      .catch(err => res.json(err));
  }


  // // remove reaction
  // removeReaction({ params }, res) {
  //   Reaction.findOneAndDelete({ _id: params.reactionId })
  //     .then(deletedReaction => {
  //       if (!deletedReaction) {
  //         return res.status(404).json({ message: 'No reaction with this id!' });
  //       }
  //       return Thought.findOneAndUpdate(
  //         { _id: params.thoughtId },
  //         { $pull: { reactions: params.reactionId } },
  //         { new: true }
  //       );
  //     })
  //     .then(deletedReaction => {
  //       if (!deletedReaction) {
  //         res.status(404).json({ message: 'Reaction has been removed!' });
  //         return;
  //       }
  //       res.json(deletedReaction);
  //     })
  //     .catch(err => res.json(err));
  // },

};

module.exports = thoughtController;
