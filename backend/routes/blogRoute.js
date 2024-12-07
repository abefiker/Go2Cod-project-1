const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.route('/').get(blogController.getBlogs).post(blogController.createBlog);
router
  .route('/:id')
  .get(blogController.getBlogById)
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);
module.exports = router;
