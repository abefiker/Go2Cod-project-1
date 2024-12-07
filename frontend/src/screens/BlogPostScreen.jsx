import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const BlogPostScreen = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (!res.ok) throw new Error('Failed to fetch blogs');
        const data = await res.json();
        setBlogs(data); // Assuming the API returns an array of blogs
      } catch (err) {
        toast.error(err.message || 'Failed to fetch blogs');
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = (id) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Add Blog Button */}
      <div className="flex justify-end mb-6">
        <Link
          to="/addBlog"
          className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-800"
        >
          Add Blog
        </Link>
      </div>

      {/* Grid of Blog Cards */}
      {blogs && blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              _id={blog._id}
              title={blog.title}
              author={blog.author}
              thumbnail={blog.thumbnail}
              body={blog.body}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No blogs available.</p>
      )}
    </div>
  );
};

export default BlogPostScreen;
