import React from 'react';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { CgDetailsMore } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const BlogCard = ({ _id, title, author, body, thumbnail, onDelete }) => {
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      try {
        const res = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          toast.success('Blog deleted successfully');
          onDelete(id); // Notify parent to remove the blog
        } else {
          const error = await res.json();
          toast.error(error.message || 'Failed to delete the blog');
        }
      } catch (err) {
        toast.error(err?.message || 'Failed to delete the blog');
      }
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Thumbnail */}
      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-40 object-cover"
        />
      )}

      {/* Blog Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500">By {author}</p>
        <p className="mt-2 text-gray-700 line-clamp-2">{body}</p>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-2 left-2 flex space-x-2">
        <Link
          to={`/blogDetail/${_id}`}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          <CgDetailsMore />
        </Link>
      </div>
      <br />
      <br />
      <div className="absolute bottom-2 right-2 flex space-x-2">
        <Link
          to={`/updateBlog/${_id}`}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          <CiEdit />
        </Link>
        <button
          onClick={() => deleteHandler(_id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          <CiTrash />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
