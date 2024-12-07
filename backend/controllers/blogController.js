const Blog = require('../models/blogModel');
const asyncHandler = require('../middleware/asyncHandler');
exports.getBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    res.status(401);
    throw new Error('Resource not found');
  }
});
exports.createBlog = asyncHandler(async (req, res) => {
  const { title, author, body, thumbnail } = req.body;
  if (!title || !author || !body || !thumbnail) {
    console.error('Validation Error:', req.body);
    res.status(400);
    throw new Error('All required fields must be provided.');
  }
  const blog = new Blog({
    title,
    author,
    body,
    thumbnail,
  });
  const createdBlog = blog.save();
  res.status(201).json(createdBlog);
});
exports.updateBlog = asyncHandler(async (req, res) => {
  const { title, author, body, thumbnail } = req.body;
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }
  if (title) {
    blog.title = title;
  }
  if (author) {
    blog.author = author;
  }
  if (body) {
    blog.body = body;
  }
  if (thumbnail) {
    blog.thumbnail = thumbnail;
  }
  const updatedBlog = await blog.save();
  res.status(200).json(updatedBlog);
});
exports.deleteBlog = asyncHandler(async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: 'resource deleted successfully' });
});

exports.getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.status(200).json(blog);
});
