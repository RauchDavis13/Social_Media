const { Schema, Types } = require('mongoose');
// const { Schema, models } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent thought _id
    // reactionId: {
    //   type: Schema.Types.ObjectId,
    //   default: () => new Types.ObjectId()
    // },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    userName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

const Reaction = [ReactionSchema];

module.exports = Reaction;
