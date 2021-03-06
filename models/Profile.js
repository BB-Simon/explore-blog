// user, title, bio, profilePice, links: {fb, ti, ins, link}, posts, bookmarks
const {Schema, model} = require('mongoose')
const User = require('./User')
const Post = require('./Post')
const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
      required: true
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500,
      required: true
    },
    profilePic: String,
    links: {
      website: String,
      twitter: String,
      facebook: String,
      github: String,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Profile = model('Profile', profileSchema)
module.exports = Profile