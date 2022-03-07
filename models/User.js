const { Schema, model } = require('mongoose');

// const FriendSchema = new Schema(
//   {
//     // set custom id to avoid confusion with parent userId
//     friendId: {
//       type: Schema.Types.ObjectId,
//       default: () => new Types.ObjectId()
//     },
//     friendName: {
//       type: String,
//       required: true
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       get: createdAtVal => dateFormat(createdAtVal)
//     }
//   },
//   {
//     toJSON: {
//       getters: true
//     }
//   }
// );




const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: 'User name is required',
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: 'Email address is required',
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },
  
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      // FriendSchema
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of friends
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
