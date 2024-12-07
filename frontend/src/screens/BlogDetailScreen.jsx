import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const BlogDetailScreen = () => {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();
        console.log(data)
        setBlog(data); // Set blog data
      } catch (err) {
        toast.error('Failed to load blog details.');
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <div>Loading...</div>; // Show a loading state

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Blog Thumbnail */}
      {blog.thumbnail && (
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg"
        />
      )}

      {/* Blog Details */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
        <p className="text-sm text-gray-500 mt-2">By {blog.author}</p>
        <p className="mt-4 text-gray-700">{blog.body}</p>
      </div>

      {/* Back Button */}
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-800"
      >
        Back to Blogs
      </Link>
    </div>
  );
};

export default BlogDetailScreen;
