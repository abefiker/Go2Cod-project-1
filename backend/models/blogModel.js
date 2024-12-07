const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
    title: {
      type: 'string',
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
